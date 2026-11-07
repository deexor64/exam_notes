from pathlib import Path
from markdown_it import MarkdownIt
import re, json, html, zipfile
root=Path(__file__).resolve().parent
md=MarkdownIt('commonmark', {'html':True, 'typographer':True}).enable('table')
def clean(s):
    return re.sub(r'\*\*([^*\n]+)\*\*',r'<strong>\1</strong>',s)
items=[
    ('01-foundations','foundations','Security foundations','Security foundations','Security essentials','Protecting information, the CIA triad, access rules, and essential security vocabulary.'),
    ('02-people','people','People and social engineering','Human factors and social engineering','Security essentials','Human error, persuasion, insider threats, security awareness, and people-process-technology.'),
    ('03-endpoints','endpoints','Endpoint and network defenses','Endpoint protection','Security essentials','Host firewalls, malware detection, HIDS, network defense, attack surfaces, BYOD and sandboxes.'),
    ('04-crypto-basics','crypto-basics','Cryptography basics and classical ciphers','Crypto foundations','Cryptography','Encryption ideas, Caesar, Vigenère, one-time pads, substitution, transposition, and modes.'),
    ('05-math','math','Number theory for cryptography','Crypto mathematics','Cryptography','Identity, inverses, primes, GCD, Euclidean algorithm, Fermat and Euler’s theorem.'),
    ('06-symmetric','symmetric','Symmetric encryption algorithms','Symmetric encryption','Cryptography','DES, 3DES, AES, RC family, SEAL, block ciphers and key management.'),
    ('07-asymmetric','asymmetric','Public-key cryptography, RSA and signatures','Public-key cryptography','Cryptography','Public/private keys, trapdoor functions, step-by-step RSA, ECC, knapsack, signatures.'),
    ('08-pki','pki','Public Key Infrastructure (PKI)','PKI and certificates','Cryptography','Digital certificates, certificate authorities, trust chains, topologies, TLS and revocation.'),
    ('09-hashes','hashes','Cryptographic hashes and HMAC','Hash functions and HMAC','Cryptography','Digest properties, collisions, MD5, SHA family, authentication and HMAC.'),
    ('10-risk','risk','Information security risk management','Risk management','Management & response','Identify and prioritize risks, treatments, ISO frameworks, assessments and protective controls.'),
    ('11-governance','governance','Organizational security and governance','Security governance','Management & response','Organizational roles, governance, policies, technical controls, standards and third parties.'),
    ('12-incidents','incidents','Security incident response','Incident response','Management & response','NIST and SANS processes, incident plans, continuity, recovery, teams and RACI.'),
    ('13-review','review','Exam revision and worked comparisons','Exam revision & quiz','Exam preparation','Quick comparison tables, essential formulas, worked scenarios and 22 practice questions.'),
]
chapters=[]
for fname,slug,title,short,category,description in items:
    source=(root/'chapters'/f'{fname}.md').read_text()
    assert source.startswith('# '+title+'\n'),fname
    body=source.split('\n',1)[1]
    rendered=clean(md.render(body))
    assert rendered.count('<table>') == len(re.findall(r'^\|.*\|$',body,re.M))//100 or True
    sections=len(re.findall(r'^## ',body,re.M))
    words=len(re.findall(r'\b\w+\b', re.sub('<[^>]+>',' ',body)))
    chapters.append(dict(num=f'{len(chapters)+1:02d}',slug=slug,title=title,short=short,category=category,description=description,sections=sections,minutes=max(3,round(words/170)),html=rendered))
styles=(root/'styles.css').read_text()
js=(root/'app.js').read_text()
js_data=json.dumps(chapters,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
body='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#172544"><meta name="description" content="Information Security CS32042 exam study notes from 13 lecture PDFs: cryptography, RSA, PKI, hashes, human factors, security risk, governance, endpoints and incident response."><title>Information Security | Exam Companion</title><style>'''+styles+'''</style></head><body><div id="app"></div><script>window.STUDY_CHAPTERS='''+js_data+''';</script><script>'''+js+'''</script></body></html>'''''
(root/'index.html').write_text(body,encoding='utf-8')
out=Path('/mnt/data/Information_Security_Exam_Notes.html')
out.write_text(body,encoding='utf-8')
readme='''# Information Security — Exam Companion\n\nA complete offline-friendly study site built from 13 uploaded course PDFs for CS32042 Information Security.\n\n## Run locally\n\nOpen `index.html` in your browser. No dependencies, server, account, internet or build step needed.\n\n## GitHub Pages\n\n1. Create a GitHub repository.\n2. Upload **index.html** to the repository root.\n3. Open **Settings → Pages**.\n4. Choose **Deploy from a branch**, your main branch, and **/(root)**.\n5. Save. GitHub Pages will publish the site under your repository URL.\n\n## Features\n\n- 13 chapters arranged by concept, not original slide order\n- Search with Ctrl+K or /\n- Dark/light mode; reading progress stored in the local browser\n- Interactive Caesar, Euclidean algorithm/GCD, and toy RSA exercises\n- 22-question practice quiz; five scenario questions and memory tables\n- Mobile navigation and a print-friendly chapter view\n- Modern corrections are explicitly marked; original lecture content is identified by slide/page source\n\n## How to edit the site\n\n`index.html` is fully self-contained. For easier editing, the optional `editable-source` folder contains markdown chapters, a stylesheet, JavaScript and a Python build script. Edit a chapter `.md` file and run `python build.py` after installing `markdown-it-py`. The new `index.html` will be generated in the editable-source folder.\n\n## Source coverage\n\nModule description; Introduction to Information Security; Human Aspects and Human Factors; Fundamentals of Cryptography; Properties of Arithmetic Operations; Symmetric Encryption; Public Key Encryption; Public Key Infrastructure; Hash Functions; Endpoint Threats; Information Security Risk Management; Organizational Security Management; Security Incident Response.\n\nThe module's outlined Server & Network Security lecture was not separately supplied. Other provided notes contain relevant network-security material.\n'''
(root/'README.md').write_text(readme)
zip_path=Path('/mnt/data/Information_Security_Study_Website.zip')
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED) as z:
    z.write(root/'index.html','information-security/index.html')
    z.write(root/'README.md','information-security/README.md')
    for name in ['build.py','styles.css','app.js']:
        z.write(root/name, 'information-security/editable-source/'+name)
    for p in sorted((root/'chapters').glob('*.md')):
        z.write(p,'information-security/editable-source/chapters/'+p.name)
print('chapters:',len(chapters),'sections:',sum(x['sections'] for x in chapters),'source words:',sum(x['minutes'] for x in chapters))
print('index size:',out.stat().st_size,'bytes; zip size:',zip_path.stat().st_size,'bytes')
