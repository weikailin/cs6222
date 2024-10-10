---
layout: page
title: 4. PRG from OWF
nav_order: 4
nav_exclude: false
---

$$
\newcommand{\RF}{\mathsf{RF}}
\newcommand{\PRF}{\mathsf{PRF}}
\newcommand{\Enc}{\mathsf{Enc}}
\newcommand{\Dec}{\mathsf{Dec}}
\newcommand{\Gen}{\mathsf{Gen}}
\newcommand{\Expr}{\mathsf{Expr}}
\newcommand{\state}{\mathsf{state}}
$$
{: .d-none}

Contruct PRG from OWF
==========================================

We have shown that given a PRG, we can construct a CPA-secure encryption.
We also showed that PRG, PRF, and CPA-secure encryption implies OWF, 
so OWFs are necessary if we want cryptography.
We also have a universal OWF that is as strong as any candidate OWF.
It remains to construct PRG from OWF.
The construction implies that
OWF is **necessary and sufficient** for PRG, PRF, and encryption,
and that we have an encryption (and PRG and PRF) that is as strong as any encryption
(by universal OWF).

![OWF vs others](assets/images/hclemma-plain.svg)

Hard-Core Bits from any OWF 
---------------------------

So far we have not yet have a candidate construction of PRG (even with 1-bit expansion).
We will next construct a PRG from one-way *permutations* (which is easier).

The construct of PRG comes from two properties of OWF:
- The output of $$f(x)$$ must be sufficiently random (given the input $$x$$ is uniform).
  
  (If the random variable $$y := f(x)$$ is constant or taken over a small support for most $$x$$, 
  then we can invert $$y$$ with good probability.)

- By hard to invert, there must be *some bits* of $$x$$ 
  that are hard to guess even when $$f(x)$$ is given.

  A sufficiently random $$f(x)$$ can still be easily inverted (such as indentity function).
  How many bits are hard to guess for any polynomial-time adversary? 
  Must be $$\omega(\log n)$$ (otherwise, it can be guessed correctly w.p. $$1/poly(n)$$).

Suppose that $$f$$ is OWP, then we have "fully random" $$f(x)$$.
That is good in terms of the first property.

#### **Definition:** One-way Permutations

{: .defn}
> An OWF $$f: \bit^n \to \bit^n$$ for all $$n\in\N$$ is called a *one-way permutations*
> if $$f$$ is a bijection.

To utilize the second property, we want to obtain some of the "hard bits" from the input $$x$$.
If we can get 1 extra hard bit, we have a construction of PRG 
by putting together the output of OWP and the extra hard bit.
The hard bit must be depend on the output mathematically,
but it shall be *hard to compute* even given the output.
The hard bit is formalized below.

#### **Definition:** Hard-core bits

{: .defn}
> A predicate $$h : \bit^\ast \to \bit$$ is a *hard-core predicate* 
> for $$f (x)$$ if $$h$$ is efficiently computable given $$x$$, 
> and for any NUPPT adversary $$A$$, there exists a negligible $$\eps$$
> so that for all $$n\in\N$$,
> 
> $$
> \Pr[x \gets \bit^n: A(1^n, f(x)) = h(x)] \le \frac{1}{2} + \eps(n).
> $$

Notice that here we are not restricting $$f$$ to OWP nor OWF.
(If $$f$$ never use a bit in the input, then that bit is hard-core.
However, such $$f$$ is not permutation and is more challenging for us.
We will focus on OWP in this section.)

That is indeed the case for some OWPs, such as RSA.
If we construct OWP from the RSA assumption, 
then the least significant bit of $$x$$ is that "hard to guess" one,
and then we can obtain PRG from RSA assumption.

#### **Theorem:** PRG from OWP and hard-core predicate

{:.theorem}
> Suppose that $$f: \bit^n \to \bit^n$$ is a OWP and $$h: \bit^n \to \bit$$ is 
> a hard-core predicate for $$f$$ (for all $$n\in\N$$).
> Then, $$g: \bit^n \to \bit^{n+1}$$ to be defined below is a PRG:
> 
> $$
> g(x) := f(x) \| h(x).
> $$
> 
> (The proof is a standard reduction: if there exists a NUPPT distinguisher $$D$$ against $$g$$,
> then we can build a NUPPT adversary $$A$$ that inverts $$f$$ by running $$D$$.)

However, we want to obtain PRG from *any* OWP 
or any OWF (without depending on specific assumptions). That is unfortunately unclear.

Fortunately, Goldreich-Levin showed that for any OWF (or OWP) $$f'$$, 
we can obtain another OWF (or OWP) $$f$$ that we know its hard-core predicate.
The intuition is: given $$f'$$ is hard to invert, in the preimage of $$f(x)$$,
there must be at least $$\omega(\log n)$$ bits that are hard to guess
(otherwise, a poly-time adversary can invert).
The hard-core predicate formalizes those bits.
Even we do not know which bits are hard, 
we can sample randomly and hope to obtain 1 bit out of them.

#### **Theorem:** Goldreich-Levin, Hard-Core Lemma

{: .theorem}
> Let $$f': \bit^n \to \bit^n$$ for all $$n\in\N$$ be a OWF.
> Define functions $$f: \bit^{2n}\to \bit^{2n}, h: \bit^{2n} \to \bit$$ to be the following:
> 
> $$
> f(x,r) := f'(x) \| r, \text{ and }
> h(x,r) := x \odot r,
> $$
> 
> where $$\odot$$ denotes the inner product modulo 2, i.e., 
> $$a \odot b := (\sum_{i\in[n]} a_i + b_i) \mod 2$$ for any $$a,b\in\bit^n$$.
> Then, $$f$$ is a OWF and $$h$$ is a hard-core predicate for $$f$$.

Note: in the above definition of $$f$$ and $$h$$, the thm says that
"even we are given the subset $$r$$ and $$f'(x)$$, because $$f'(x)$$ is hard to invert, 
we still do not know the parity of $$x$$ over $$r$$".
Since the subset $$r$$ is chosen uniformly, 
<!-- that implies that $$f'$$ has many hard-core bits out of $$n$$,  -->
and even we do not know where are them, 
$$r$$ hits some "hard bits" with overwhelming probability.
This is indeed consistent with the earlier intuition.

Clearly $$f$$ is a OWF, and $$h$$ is easy to compute.
The main challenge is to prove that $$h$$ is hard-core.
We assume for contra that $$h$$ is not hard-core, which is the following,
and then to reach contra, we want to construct another adversary $$B$$ that inverts $$f'$$.

#### **Full Assumption:**

{: .defn}
> There exists NUPPT $$A$$, polynomial $$p$$, such that for inf many $$n\in\N$$,
> 
> $$
> \Pr[x \gets \bit^n, r \gets \bit^n: A(1^{2n}, f(x,r)) = h(x,r)] \ge 1/2 + 1/p(n).
> $$

The construct and analysis of $$B$$ is involved, so we will start from a couple of warmups.

#### **Warmup Assumption 1:**

{: .defn}
> There exists NUPPT $$A$$, such that for inf many $$n\in\N$$,
> for all $$r \in \bit^n$$,
> 
> $$
> \Pr_{x}[A(1^{2n}, f(x,r)) = h(x,r)] = 1.
> $$

{: .proof}
> To invert $$y \gets f'(x)$$, the construction of $$B_1(1^n, y)$$ is simple:
> 1. For $$i = 1, 2, ..., n$$, do the following
>    1. Let $$e_i$$ be the $$n$$-bit string that only the $$i$$-th bit is 1 (0 otherwise)
>    2. Run $$x'_i \gets A(1^{2n}, y \| e_i)$$
> 2. Output $$x' := x'_1 x'_2 ... x'_n$$
> To see why $$B_1$$ inverts $$y \gets f'(x)$$, observe that $$x'_i = h(x) = x \odot e_i = x_i$$,
> where $$x = x_1 x_2 ... x_n$$.
> Hence, $$B_1$$ succeeds w.p. 1, a contradiction.

Note: the above assumed "for all $$r$$" and "w.p. $$=1$$", both are much stronger than we wanted.

#### **Warmup Assumption 2:**

{: .defn}
> There exists NUPPT $$A$$, polynomial $$p$$, such that for inf many $$n\in\N$$,
> 
> $$
> \Pr_{x,r}[A(1^{2n}, f(x,r)) = h(x,r)] \ge 3/4 + 1/p(n).
> $$

{: .proof}
> We would like to use $$e_i$$ as before, 
> but now $$A$$ may always fail whenever the suffix of $$f(x,r)$$ is $$e_i$$.
> Hence, we randomize $$e_i$$ to $$r$$ and $$r \oplus e_i$$ and then recover the inner product
> (this is also called "self correction").
> 
> {:.theorem-title}
>> Fact
>> 
>> For all $$n$$, any strings $$x, a, b \in \bit^n$$, it holds that
>> $$(x \odot a) \oplus (x \odot b) = x \odot (a \oplus b)$$.
> 
> To invert $$y \gets f'(x)$$, the construction of $$B_2(1^n, y)$$ is below:
> 1. For each $$i = 1, 2, ..., n$$, do
>    1. For $$j = 1$$ to $$m$$, do
>       1. Sample $$r \gets \bit^n$$
>       2. Run $$z_{i,j} \gets A(1^{2n}, y \| e_i\oplus r) \oplus A(1^{2n}, y \| r)$$
>    2. Let $$x'_i$$ be the majority of $$\set{z_{i,j}}_{j\in[m]}$$
> 2. Output $$x' := x'_1 x'_2 ... x'_n$$
> 
> To prove $$B_2$$ succeeds with high prob., we first prove that there are many good $$x$$'s.
> 
> {: .theorem-title}
>> Good instances are plenty.
>> 
>> Define $$G$$ to be the set of good instances,
>> 
>> $$
>> G:= \set{
>> x \in \bit^n ~|~ \Pr_{r}[A(1^{2n}, f(x,r)) = h(x,r)] \ge 3/4 + \alpha / 2 },
>> $$
>> 
>> where $$\alpha := 1/p(n)$$.  
>> If the Warmup Assumption 2 holds, then
>> $$|G| \ge 2^n \cdot \alpha / 2$$.
> 
> {: .proof}
>> This is actually a standard averaging argument (or a Markov inequality).
>> Suppose not, $$|G| \lt 2^n \cdot \alpha / 2$$.
>> Then,
>> 
>> $$
>> \begin{align*}
>> \Pr_{x,r}[A(f(x,r)) = h(x,r)]
>> & = \Pr[A=h \cap x \in G] + \Pr[A=h | x\notin G] \cdot \Pr[x \notin G]\\
>> & \lt \alpha/2 + \Pr[A=h | x\notin G]\\
>> & \lt \alpha/2 + 3/4 + \alpha /2 = 3/4 + \alpha,
>> \end{align*}
>> $$
>> 
>> which contradicts Warmup Assumption 2.
> 
> Now, suppose that $$x \in G$$.
> $$A$$ fails to invert $$y \| e_i \oplus r$$ or $$y \| r$$ w.p. $$\lt 1/2 - \alpha$$ by union bound.
> So, for any fixed $$i$$, $$\Pr[z_{i,j} = x_i] \ge 1/2 + \alpha$$ for each $$j$$ independently.
> By Chernoff bound, the majority of $$z_{i,j}$$ is $$x_i$$ w.p. $$\ge 1 - e^{-m\alpha^2 /2}$$.
> Choosing $$m = np^2(n)$$, the probability is at least $$1 - e^{-\Omega(n)}$$.
> By union bound over all $$i\in[n]$$, $$B_2$$ recovers $$x$$ except w.p. $$e^{-\Omega(n)}$$.
> 
> Finally, $$B_2$$ succeeds w.p. $$\ge \alpha / 4$$ for all $$x$$ uniformly sampled
> by failing for all $$x \notin G$$.

To complete the full proof, We want to lower the probability from $$3/4$$ to $$1/2$$.
The "good set" still holds when modified to $$1/2$$ (since it is a simple averaging).
The main challenges from the previous $$3/4$$ proof is:

- It is too weak to take the union bound of inverting both $$y \| e_i \oplus r$$ and $$y \| r$$. 
  For $$1/2$$, that probability is lowered to only $$\alpha$$, 
  and then that is too low for the following majority and Chernoff bound.

The first idea is to *guess* the inner product $$x \odot r$$ uniformly at random, 
which is a correct guess w.p. $$1/2$$.
Supposing that $$p(n)$$ is a constant, we can choose $$m(n) = O(\log n)$$,
all $$m$$ guesses are correct w.p. $$1/2^m = 1 / \poly(n)$$, 
then conditioned on correct guesses, we have $$A(y \| e_i \oplus r)$$ correct w.p. $$1/2 + \alpha$$ (when $$x$$ is good),
and then we can continue with Chernoff bound (w.p. $$1/\poly(n)$$ to fail) and finish the prove.
For large $$p(n)$$, the guesses are too many, 
and thus the success probability $$1/2^m$$ is negligible in $$n$$.

The second idea is to use *pairwise independent* guesses.
Particularly, we have Chebychev's bound for the measure concentration of pairwise indep. r.v.
(instead of Chernoff bound for fully indep.).

#### **Theorem:** Chebychev's inequality

{:.theorem}
> Let $$X_1, ..., X_m \in [0,1]$$ be pairwise independent random variables such that for all $$j$$,
> $$\E[X_j] = \mu$$. Then,
>
> $$
> \Pr\left[ |X - m \mu| \ge m \delta \right] \le \frac{1-\mu^2}{m \delta^2},
> $$
> 
> where $$X := \sum_{j\in[m]} X_i$$.
> 
> [Ps, p189]

We can then reduce the number of guesses from  $$m$$ to $$\log m$$.

#### **Fact:** Sampling pairwise independent random strings

{: .theorem}
> For any $$n, m \in \N$$, let $$(u_i : u_i \gets \bit^n)_{i \in [\log m]}$$ 
> be strings independently sampled uniformly at random 
> (we abuse notation and round up $$\log m$$ to the next integer).
> Define strings $$r_I$$ for each $$I \subseteq [\log m]$$ to be
> 
> $$
> r_I := \bigoplus_{i \in I} u_i.
> $$
> 
> The random variables $$(r_1, r_2, ..., r_m)$$ are pairwise independent,
> where $$r_j$$ denotes $$r_I$$ such that $$I$$ is the $$j$$-th subset of $$[\log m]$$.
> 
> (The proof is left as exercise.)

Now we are ready to prove the full theorem.

{: .proof-title}
> Proof of Hard-Core Lemma (Goldreich-Levin, 1989)
> 
> Given NUPPT $$A$$ in the [Full Assumption](#full-assumption),
> we construct $$B$$ that inverts $$y \gets f'(x)$$ as follows.
> 
> {:.defn-title}
>> Algorithm $$B(1^n, y)$$
>> 
>> 0. Let $$m(n)$$ be a polynomial to choose later. 
>> 1. Let $$\ell := \log m$$, $$(u_1, ..., u_\ell)$$ be fully independent and $$(r_1,..., r_m)$$ be pairwise independent
>>    $$n$$-bit random strings as in [sampling pairwise independent](#fact-sampling-pairwise-independent-random-strings).
>> 2. Let $$(b_1, ..., b_\ell)$$ be fully independent and $$(g_1,..., g_m)$$ be pairwise independent random 1-bit strings (symmetricall as in the previous step) 
>> 3. For each $$i=1,2, .., n$$,
>>    1. For each $$j=1,2,..., m$$,
>>       - Run $$z_{i,j} \gets A(1^{2n}, y \| e_i \oplus r_j) \oplus g_{j}$$.
>>    2. Let $$x'_i$$ be the majority of $$\set{z_{i,j}}_{j\in[m]}$$
>> 4. Output $$x' := x'_1 x'_2 ... x'_n$$
> 
> We begin with claiming the number of good instances of $$x$$.
> 
> {: .theorem-title}
>> Good instances are plenty.
>> 
>> Define $$G$$ to be the set of good instances,
>> 
>> $$
>> G:= \set{
>> x \in \bit^n ~|~ \Pr_{r}[A(1^{2n}, f(x,r)) = h(x,r)] \ge 1/2 + \alpha / 2 },
>> $$
>> 
>> where $$\alpha := 1/p(n)$$. 
>> If the [Full Assumption](#full-assumption) holds, then
>> $$|G| \ge 2^n \cdot \alpha / 2$$.
>> 
>> (The proof is almost the same and omitted.)
> 
> We condition on the good event that $$x \in G$$.
> Next, we condition on the "lucky event" that 
> for all $$k$$, the guess $$b_k$$ equals to $$x \odot u_k$$, which happens w.p. $$1/m$$.
> That implies that for all $$j$$, we have the correct guess $$g_j = x \odot r_j$$;
> that is, for any $$j \in [m]$$, let $$S := \set{k : k\text{-th bit of } j \text{ is 1}}$$,
> we have that
> 
> $$
> g_{j} = \bigoplus_{k \in S} b_{k} = \bigoplus_{k \in S} x \odot u_k = x \odot r_j.
> $$
> 
> With the conditioning, for any $$j \neq j'$$, $$r_j$$ and $$r_{j'}$$ are still pairwise independent, and similarly $$(A(y \| e_i \oplus r_j), A(y\|e_i \oplus r_{j'}))$$.
<!-- > and thus $$(g_{i,j}, g_{i,j'})$$ are pairwise independent as well. -->
> Therefore, by Chebychev's inequality, the majority of $$z_{i,j}$$ equals to $$x \odot e_i$$
> w.p.
> 
> $$
> \Pr[ m (1 + \alpha)/2 - X \ge m \alpha/2] \le \frac{1}{m \cdot (\alpha/2)^2},
> $$
> 
> where $$X = \sum_j X_j$$, and $$X_j$$ denotes the event that $$A$$ outputs $$x\odot(e_i \oplus r_j)$$ correctly.
> Choosing sufficiently large $$m(n) := 8n p^2(n)$$, we have that $$\Pr[x'_i \neq x_i] \le 1/2n$$.
> 
> The above shows that each bit $$x_i$$ is correctly recovered with a good marginal probability.
> We want that *all bits $$x'_i$$'s are correct* with a good joint probability,
> but the different $$x'_i$$'s come from the *same* randomness $$u_k$$'s and $$b_k$$'s.
> (It is necessary to use the same $$b_k$$'s 
> because we want the number of guessed bits to be strictly logarithmic in $$n$$).
> 
> Fortunately, union bound works with dependent events.
> Taking union bound for all $$i\in[n]$$, $$\Pr[x' = x] \ge 1/2$$, 
> conditioning on $$x \in G$$ and all $$b_i$$'s are correct.
> Removing the conditional events\* takes $$\alpha/2$$ and $$1/m$$, but $$B$$ still inverts $$y$$
> w.p. $$\ge 1/(4p(n)m(n)) = 1 / 32 n p^3(n)$$, contradicting $$f'$$ is OWF.
> 
> \* For any events $$A,B,C$$, $$\Pr[A] \ge \Pr[A | B \cap C] \Pr[B \cap C]$$.
> The above applied that $$A$$ is $$x' = x$$, $$B$$ is $$x \in G$$, and
> $$C$$ is the event that $$b_k = A(y\| u_k)$$ is correct for all $$k \in [\ell].

**Discuss**{:.label}
The number of bits we guessed is $$\log m = O(\log p(n)) = O(\log n)$$, 
where $$p(n)$$ depends on the (hypothetical) NUPPT $$A$$.
Since the guessed bits entails information about $$x$$,
the proof formally implies that for any OWF, there must be $$\omega(\log n)$$ bits 
that are hard to invert (from $$f(x)$$ to $$x$$).
Still, having an *efficient and uniform attack* is non-trivial.
Put it in another view. 
The output of adversary $$A$$ gives a probabilistic bit conveying information about $$x$$,
and the reduction is to *learn* $$x$$ by repeatedly querying $$A$$ with
carefully chosen inputs, so that the probability of finding correct $$x$$ is high
and the time and query is small.
Hence, the reduction is related to learning at a high level.

**Discuss**{:.label}
How far does the Hard-core Lemma extend to? 
Suppose $$f'$$ is OWF, and suppose $$h'$$ is a hard-core predicate for $$f'$$.
- Is $$f(x) := f'(x) \| h'(x)$$ a OWF?
- Let $$f(x,t,r) := f'(x) \| t \| r$$, and let $$h(x,t,r) := x \odot r$$. 
  Is $$f$$ a OWF? If so, is $$h$$ a hard-core predicate for $$f$$?
- Let $$f(x,t,r) := f'(x) \| t \| x \odot t \| r$$, and let $$h(x,t,r) := x \odot r$$. 
  Is $$f$$ a OWF? If so, is $$h$$ a hard-core predicate for $$f$$?

The questions are highly relevant when we want to construct PRG from any one-way *function*.

Min-Entropy and Leftover Hash Lemma 
---------------------------

We will use pairwise independent hash functions.
The following facts are borrowed from the book of Salil Vadhan, 
[*Pseudorandomness*](https://people.seas.harvard.edu/~salil/pseudorandomness/pseudorandomness-published-Dec12.pdf), cited as [V].

#### **Definition:** statistical difference

{:.defn}
> For random variables $$X$$ and $$Y$$ taking values in $$U$$, 
> their *statistical difference* (also known as *variation distance*) is 
> $$\Delta(X, Y) := \max_{T \subseteq U} | \Pr[X \in T ] − \Pr[Y \in T]|$$. 
> We say that $$X$$ and $$Y$$ are $$\eps$$-close if $$\Delta(X, Y ) \leq \eps$$.
> 
> [V, Definition 6.2, p169]

#### **Fact:** (Statistical close to uniform, warmup)

{:.theorem}
> Let $$n \in \N$$, $$\eps \in [0,1]$$, and random variable $$X \in \bit^n$$.
> If $$X$$ is $$\eps$$-close to $$U_n$$, then 
> 
> $$
> \Pr[ y \gets U_n: y \in \Supp(X)] \ge 1-\eps,
> $$
> 
> where $$\Supp(X) := \set{x : \Pr[X = x] \gt 0}$$ denotes the support of $$X$$.


#### **Definition:** Pairwise independent hash family.

{:.defn}
> A family of functions $$\cH = \set{h : \bit^n \to \bit^m}$$ is *pairwise independent* 
> if the following two conditions hold when $$h \gets \cH$$ is a function chosen uniformly at random from $$\cH$$:
> 
> 1. For all $$x \in \bit^n$$, the random variable $$h(x)$$ is uniform in $$\bit^m$$.
> 2. For all $$x_1\neq x_2 \in \bit^n$$, the random variables $$h(x_1)$$ and $$h(x_2)$$ are independent.
> 
> [V, Definition 3.21, p64]

#### **Lemma:** Pairwise independent hash from linear mapping.

{:.theorem}
> For any finite field $$F$$, define $$\cH$$ to be the following set:
> 
> $$
> \cH := \set{h_{a,b} : h_{a,b}(x) = a x + b, a,b\in F}.
> $$
> 
> $$\cH$$ is a pairwise independent hash family.
> We often abuse notation, denoting $$h \in \cH$$ to be the seed
> and $$h(x)$$ to be the evaluation of the hash function.
> 
> [V, Construction 3.23, p65]

If $$m \ge n$$,
choosing the field to be $$F_{2^m}$$ gives a construction such that 
each function takes $$2m$$ bits to describe.
If $$m \lt n$$,
choosing $$F_{2^n}$$ and chopping the output to $$m$$ bits is still pairwise independent.

#### **Corollary:**

{:.theorem}
> For any $$n,m\in\N$$, there exists a pairwise independent hash family $$\cH_{n,m}$$
> such that each $$h \in \cH$$ is $$2 \max(n,m)$$ bits.
> 
> [V, Theorem 3.26, p66]

#### **Definition:** Min-entropy

{:.defn}
> Let $$X$$ be a random variable. Then
> the min-entropy of $$X$$ is:
> 
> $$
> H_\infty(X) = \min_{x}\left\{\log \frac{1}{\Pr[X=x]}\right\}.
> $$
>   
> where all logs are base 2.
> 
> [V, Definition 6.7, p171]

{:proof-title}
> Example:
> 
> We say a function $$f: \bit^n \to \bit^n$$ is $$M$$-regular if
> it is $$M$$-to-one for every input, i.e., for all $$y \in \bit^n$$, 
> it holds that $$|f^{-1}(y)| = M$$.
> We have $$H_\infty(f(U_n)) = \log(2^n / M)$$.
> Let $$k := H_\infty(f(U_n))$$, and let $$m := \log M$$ (so that $$n = k+m$$).
> 
> Suppose someone secretly sampled $$x \gets U_n$$ and computed $$f(x)$$.
> We have the following:
> - Given nothing, we can only guess $$x$$ correctly w.p. $$2^{-n}$$.
> - Given nothing, we can only guess $$f(x)$$ correctly w.p. $$2^{-k}$$, by the min-entropy of $$f(x)$$.
> - Given $$f(x)$$, we can guess $$x$$ correctly w.p. $$2^{-m}$$.
>   Thus, $$m$$ is viewed as the min-entropy of $$x$$ given $$f(x)$$
>   (we avoid the formalization of conditional min-entropy).


#### **Theorem:** Leftover Hash Lemma

{:.theorem}
> Let $$n,m,k \in \N$$ and $$\eps > 0$$.
> Suppose that $$\cH = \set{h : \bit^n \to \bit^m}$$ is a pairwise independent family of hash functions and that $$X \in \bit^n$$ is a random variable. If $$H_\infty(X) \ge k$$ and $$m = k − 2 \log(1/\eps)$$, then $$(h, h(X))$$ $$\eps$$-close to an uniformly random string of $$|h| + m$$ bits.
> 
> [V, Theorem 6.18, p179]

Another look at Goldreich-Levin.

#### **Theorem:** Leftover Hash Lemma [Mazor-Pass 2023, Lemma 3.4]

{:.theorem}
> Let $$n\in\N, \eps \in [0,1]$$, and let $$X$$ be a random variable over $$\bit^n$$.
> Let $$M \gets \bit^{n\times n}$$ and a random matrix, and let 
> 
> $$
> \ell \le H_\infty(X) - 3 \log(1/\eps) - 4 \log n - 4.
> $$
> 
> Then,
> 
> $$
> \Delta((M,(M\odot x)_{1..\ell}), (M, U_\ell)) \le \eps,
> $$
> 
> where $$M\odot x$$ denotes the matrix multiplication modulo 2,
> $$(z)_{1..\ell}$$ denotes the first $$\ell$$ bits of $$z$$,
> and $$U_\ell$$ denotes the uniform distribution over $$\bit^\ell$$.
> 
> (See [[Mazor-Pass 2023](https://eprint.iacr.org/2023/1451.pdf)] for a simple proof from Goldreich-Levin's hard-core lemma.)

{:proof-title}
> Example:
> 
> Consider a distribution $$X \in \bit^n$$ such that 
> $$H_\infty(X) = k$$ for some $$k \in [0,n]$$.
> Let $$M$$ be the matrix sampled as in LHL, 
> and let $$\ell$$ be defined w.r.t. $$k$$ as in LHL.
> Sample $$z \gets \bit^\ell$$ uniformly at random.
> Then, for any $$\eps \in [0,1]$$, we have that
> 
> $$
> \Pr_{M,z}[\exists x \text{~s.t.~} p_X(x) > 0] \ge 1 - \eps,
> $$
> 
> where $$p_X(\cdot)$$ denotes the probability mass function of $$X$$.

{:proof-title}
> Example:
> 
> Consider the distribution $$X$$, the random matrix $$M$$, the parameter $$\ell$$
> defined as the above.
> Then, for any $$\eps \in [0,1]$$, we have that the following two distributions
> - $$(M, (M\odot x_1)_{1..\ell}), (M\odot x_2)_{1..\ell})$$ and
> - $$(M, U_{1,\ell}, U_{2,\ell})$$
> are $$2\eps$$-close, where $$U_{1,\ell}$$ and $$U_{2,\ell}$$ are two independent
> and uniformly random $$\ell$$-bit strings.
> 
> (The proof is a simple hybrid.)

Notice that in the above example, $$x_1$$ and $$x_2$$ did not need to be the same distribution,
and they didn't even need to be independent.

PRG from any OWF
---------------------------

We assume that the OWF $f: \bit^n \to \bit^n$.
This is w.l.o.g.: if input is shorter, then we pad the input with unused random bits;
if the output is shorter, then we pad the output with fixed bits.
The same applies to the new notions in this section, namely weak PEG and PEG.

Historically, the first construction of PRG from OWF is given by [HILL'99](https://epubs.siam.org/doi/10.1137/S0097539793244708),
which was initiated by [IL'89](https://ieeexplore.ieee.org/document/63483) and [ILL'89](https://dl.acm.org/doi/10.1145/73007.73009).
The construction here is presented by [a lecture of Barak at Princeton](https://www.cs.princeton.edu/courses/archive/spr08/cos598D/scribe3.pdf),
which followed the paper of [Holenstein'06](https://link.springer.com/chapter/10.1007/11681878_23).
Later, [HRV'13](https://epubs.siam.org/doi/10.1137/100814421) and [VZ'12](https://dl.acm.org/doi/10.1145/2213977.2214051) improved the efficiency.
Interestingly in constructions of PRG, 
there are several novel tools that are useful later, e.g.,
the Leftover Hash Lemma, due to [ILL'89].

Even the result is impactful, the full construction is often skipped in textbooks
and graduate-level cryptography.
Many books and courses cover the Goldreich-Levin hard-core lemma [Ps, KL], 
but only few of them goes beyond that
(such as [the lecture of Bellare, 1999](https://cseweb.ucsd.edu/~mihir/papers/gl.pdf)).
The book of [Goldreich, Section 3.5](https://doi.org/10.1017/CBO9780511546891)
is one that goes much deeper, which constructs PRG from any "regular" OWF,
where regular means that for the same length $$x$$, 
the pre-image set $$f^{-1}(f(x))$$ is the same cardinality.
Still, the full construction

> ... is even more complex and is not suitable for a book of this nature.
> 
> -- <cite>Goldreich, Section 3.5</cite>

The only teaching material we found is
the lecture of [Barak](https://www.cs.princeton.edu/courses/archive/spr08/cos598D/scribe3.pdf).

In this subsection, we describe the construction of Mazor and Pass [[MP23]](https://eprint.iacr.org/2023/1451.pdf).

#### **Construction:** Mazor-Pass PRG

{: .defn}
> Let $$f: \bit^n \to \bit^n$$ be a function for all $$n\in\N$$.
> Define the following functions.
> 
> - $$h_M(x) := M\odot f(x) \| M\odot x$$, where $$x\in\bit^n$$, and
>   $$M\in \bit^{n\times n}$$ is a matrix that will be given later. 
>   Looking forward, we will compute $$h_M(x)$$ for different $$x$$'s but the same $$M$$.
> - $$\bar h_M(x_1, ..., x_{t}) := h_M(x_1) \| ... \| h_M(x_{t})$$,
>   which is simply repeatedly applying $$h_M$$ on $$t$$ independent strings $$x_i\in\bit^n$$
>   and concatenate the outputs.
> 
> The function $$g$$ is defined by the following (deterministic) algorithm, where 
> - $$s,t = \poly(n)$$ are parameters to be determined later, 
> - $$s' := s \cdot \ceil{\frac{n + \log n}{2n}}$$ is also a parameter, 
> - $$M \in \bit^{n\times n}$$, $$x_{i,j} \in \bit^n$$, $$r_i \in [2n]$$, and $$R \in \bit^{s' \times s}$$ 
>   are all inputs ($$r_i$$ is represented in a $$(\log n)$$-bit binary string).
> 
>> Function $$g(M, (x_{i,j} : i \in [s], j\in [t]), (r_i : i \in [s]), R)$$:
>> 1. For all $$i \in [s]$$, compute $$y'_i \gets \bar h_M(x_{i,1}, ..., x_{i,t})$$.
>>    This is called a "row," which consists of $$2nt$$ bits.
>> 2. For each $$i \in [s]$$, remove from $$y'_i$$ the prefix $$r_i$$ bits and suffix $$2n - r_i$$ bits;
>>    call the resulting $$2n(t-1)$$-bit string as $$y_i$$.
>> 3. Define $$R(\hat y) := R \odot \hat y$$ for any $$s$$-bit $$y$$.
>> 4. For each $$j \in [2n(t-1)]$$, define $$\hat y_j := y_{1,j} \| y_{2,j} \| ... \| y_{s,j}$$.
>>    That is, $$\hat y_j$$ is the concatenation of the $$j$$-th bits of all $$y_1, y_2, ..., y_s$$,
>>    and thus each $$\hat y_j$$ is $$s$$-bit.
>> 5. Output $$M\| R\| R(\hat y_1) \| R(\hat y_2) \| ... \| R(\hat y_{2n(t-1)})$$.

We claim that if $$f$$ is OWF, then the function $$g$$ defined as the above is a PRG.
Clearly, $$g$$ is easy to compute if $$f$$ is.
For expansion, the input and output sizes of $$g$$ are:
- Input: $$n^2 + nst + s(1+\log n) + ss'$$, for $$M$$, $$x$$'s, $$r$$'s, and $$R$$.
- Output: $$n^2 + ss' + 2n(t-1)s'$$. Since $$s' = s/2 + s \cdot \frac{\log}{2n}$$, 
  we have that $$ 2n(t-1)s' = n(t-1)s + (t-1)s \log (2n).$$

Choosing sufficiently large $$t \ge 2n$$, 
we obtain the expansion as the difference between output and input size is

$$
n(t-1)s + (t-1)s \log (2n) - (nst + s(1+\log n))
= -ns + (2n-2)s \log (2n) > 1,
$$

It remains to show pseudorandomness.


