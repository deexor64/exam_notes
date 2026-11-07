# Number theory for cryptography

> **Core idea** · RSA uses arithmetic done **modulo n**. The difficult-looking equations become much easier once you understand remainder, greatest common divisor, and modular inverse.

## Identity and inverse

An **identity element** leaves an operand unchanged: for addition it is **0**, because `x + 0 = x`; for multiplication it is **1**, because `x × 1 = x`.

An **inverse** reverses an operation to get the identity. Under addition, the inverse of `a` is `−a` because `a + (−a) = 0`. Under ordinary multiplication, the inverse of nonzero `a` is `1/a` because `a × (1/a) = 1`.

> **Don't confuse them** · The identity belongs to the **operation** (such as 0 for addition). An inverse belongs to a **specific element under that operation** (such as −7 for 7 under addition).

**Source:** Arithmetic properties, slides 2–3.

## Primes, factorization and relatively prime numbers

A **prime** integer greater than 1 has exactly two positive divisors: **1 and itself**. `2, 3, 5, 7, 11, ...` are prime; **1 is not prime**. Every integer greater than 1 has a unique factorization into primes (up to order).

Examples: `91 = 7 × 13` and `3600 = 2⁴ × 3² × 5²`.

The **greatest common divisor**, `gcd(a,b)`, is the largest positive integer that divides both. Two numbers are **coprime / relatively prime** when `gcd(a,b) = 1`, even if neither number is itself prime. Example: `8` and `15` are coprime.

For factorizations, take each **shared** prime with the **smaller exponent**. Example: `300 = 2² × 3 × 5²` and `18 = 2 × 3²`, so `gcd(300,18)=2×3=6`.

**Source:** Arithmetic properties, slides 4–6, 11.

## Modulo and Euclidean algorithm

`a mod n` means the remainder after dividing `a` by `n`. For example, `17 mod 5 = 2`. The symbol `a ≡ b (mod n)` says that `a` and `b` have the **same remainder modulo n**.

The **Euclidean algorithm** uses:

<div class="formula">gcd(a,b) = gcd(b, a mod b)</div>

Repeat until the remainder is zero. The **last nonzero remainder** is the GCD.

**Worked example: `gcd(252,105)`**:

<div class="step-stack"><div><em>1</em><span>252 = 2 × 105 + 42</span></div><div><em>2</em><span>105 = 2 × 42 + 21</span></div><div><em>3</em><span>42 = 2 × 21 + 0</span></div></div>

Result: **gcd(252,105) = 21**. Why? Replacing the larger number with its remainder does not change the set of common divisors.

<div class="tool-panel"><div class="tool-head"><strong>Explore the Euclidean algorithm</strong><span class="badge">Interactive</span></div><div class="input-row"><label>First number <input id="gcdA" type="number" value="1970" min="1" max="1000000000"></label><label>Second number <input id="gcdB" type="number" value="1066" min="1" max="1000000000"></label></div><button type="button" class="tool-button" id="gcdRun">Show the steps</button><pre class="tool-result" id="gcdResult"></pre></div>

**Source:** Arithmetic properties, slides 5–8.

## Modular multiplicative inverse

A number `d` is the inverse of `e` **modulo m** when:

<div class="formula">e × d ≡ 1 (mod m)</div>

For example, `3 × 2 = 6 ≡ 1 (mod 5)`, so **the modular inverse of 3 modulo 5 is 2**. This is *not* the ordinary fraction 1/3.

A modular inverse of `e (mod m)` exists **exactly when** `gcd(e,m)=1`. In RSA, the private exponent `d` is chosen as the modular inverse of public exponent `e` modulo `φ(n)` (or an equivalent valid construction).

> **Why can an inverse fail?** · `2` has no inverse modulo `6`: multiplying 2 by any integer gives an even number, and no even number is 1 modulo 6. This is why RSA checks that `e` and `φ(n)` are coprime.

**Source:** Arithmetic properties, slides 2–3, 9–10; RSA lecture, slides 19–21. Existence criterion is extra explanation.

## Fermat's little theorem

For prime **p** and integer **a** not divisible by p:

<div class="formula">a<sup>p−1</sup> ≡ 1 (mod p)</div>

Also for every integer a, **a<sup>p</sup> ≡ a (mod p)** when p is prime. From Fermat, the modular inverse of a modulo prime p is **a<sup>p−2</sup> (mod p)** when `a mod p ≠ 0`.

Example: inverse of `3 mod 5` is `3³ mod 5 = 27 mod 5 = 2`.

**Why the condition?** If `a` is divisible by p, it becomes 0 modulo p, and 0 has no multiplicative inverse.

**Source:** Arithmetic properties, slides 9–10.

## Euler's totient and theorem

**Euler's totient function `φ(n)`** counts positive integers less than n that are coprime with n.

- If **p** is prime, `φ(p)=p−1`. Every integer 1 through p−1 is coprime with p.
- If **p and q are distinct primes**, `φ(pq)=(p−1)(q−1)`.
- Example: `φ(15)=φ(3×5)=(2)(4)=8`. The coprimes below 15 are `1,2,4,7,8,11,13,14`.

**Euler's theorem** says when `gcd(a,n)=1`:

<div class="formula">a<sup>φ(n)</sup> ≡ 1 (mod n)</div>

This connects to RSA: we choose `e × d ≡ 1 (mod φ(n))`. Under RSA's number-theory setup, raising a message to `e` and then `d` recovers that message modulo n.

**Source:** Arithmetic properties, slide 12; RSA lecture, slides 19–21.
