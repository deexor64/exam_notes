# Exam Hub

A simple homepage linking to individual exam-study websites. Everything works as static HTML on GitHub Pages.

## Add a new module

1. **Create a folder** for the module, and place its website inside with an `index.html` entry point:

   ```text
   exam-notes/
   ├── index.html             # Exam Hub
   ├── automata/index.html
   ├── machine-learning/index.html
   ├── statistics/index.html
   └── operating-systems/
       └── index.html
   ```

2. **Edit the hub's root `index.html`.** Find `<div class="grid" id="grid">` and duplicate one of the existing `<a class="card"> ... </a>` blocks inside it. Update the path, title, category, description, and search keywords:

   ```html
   <a
       class="card"
       href="./operating-systems/index.html" <!--Edit -->
       data-search="operating systems os processes threads memory scheduling" <!--Edit -->
   >
       <div class="card-top">
           <div class="icon blue" aria-hidden="true">⌘</div> <!--Edit -->
           <span class="arrow" aria-hidden="true">↗</span>
       </div>
       <p class="tag">Computer systems</p> <!--Edit -->
       <h3>Operating Systems</h3> <!--Edit -->
       <p class="desc"> <!--Edit -->
           Processes, scheduling, memory, and file systems.
       </p>
   </a>
   ```

   Available icon color classes in the current hub: `blue`, `teal`, `violet`.

3. **Test locally.** Open the root `index.html` in a browser, check the new card, and try searching for the module. Keep links relative (`./folder/index.html`) so they work on GitHub Pages.

4. **Publish your changes:**

   ```bash
   git add .
   git commit -m "Add Operating Systems module"
   git push
   ```

> **Note:** The module counter updates automatically when searching, but its initial HTML text is currently `3 modules`. Update the text inside `<span class="count" id="count">` to reflect the new total (e.g., `4 modules`).
