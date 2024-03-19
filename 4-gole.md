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
- The output of $$f(x)$$ must be sufficiently random when the input $$x$$ is uniform.
  (If the random variable $$y := f(x)$$ is constant or taken over a small support for most $$x$$, 
  then we can invert $$y$$ with good probability.)
- A sufficiently random $$f(x)$$ can still be easily inverted (such as indentity function).
  By hard to invert, there must be *some bits* of $$x$$ 
  that are hard to guess even when $$f(x)$$ is given.
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
>> 2. For each $$k \in [\ell]$$, sample guess bit $$b_k$$ uniformly. For each $$j \in [m]$$, 
>>    compute the pairwise independent bits $$g_{i,j}$$ from $$(b_1, ..., b_\ell)$$ in the same way as $$r_j$$
>>    (so that for any $$x$$, $$g_{i,j} = x \odot r_j$$ and $$b_k = x \odot u_k$$ for all $$k$$).
>> 3. For each $$i=1,2, .., n$$,
>>    1. For each $$j=1,2,..., m$$,
>>       - Run $$z_{i,j} \gets A(1^{2n}, y \| e_i \oplus r_j) \oplus g_{i,j}$$.
>>
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
> That implies $$(g_{i,1}, ..., g_{i,m})$$ are all correct:
> for any $$j \in [m]$$, let $$S := \set{k : k\text{-th bit of } j \text{ is 1}}$$,
> we have that
> 
> $$
> g_{i,j} = \bigoplus_{k \in S} b_{i,k} = \bigoplus_{k \in S} x \odot u_k = x \odot r_j.
> $$
> 
> With the conditioning, for any $$j \neq j'$$, $$r_j$$ and $$r_{j'}$$ are still pairwise independent,
> and thus $$(g_{i,j}, g_{i,j'})$$ are pairwise independent as well.
> Therefore, by Chebychev's inequality, the majority of $$g_{i,j}$$ equals to $$x \odot e_i$$
> w.p.
> 
> $$
> \Pr[ m (1 + \alpha)/2 - X \ge m \alpha/2] \le \frac{1}{m \cdot (\alpha/2)^2},
> $$
> 
> where $$X = \sum_j X_j$$, and $$X_j$$ denotes the event that $$A$$ outputs $$x\odot(e_i \oplus r_j)$$ correctly.
> Choosing $$m(n) := 8n p^2(n)$$, we have that $$\Pr[x'_i \neq x_i] \le 1/2n$$.
> 
> The above shows that each bit $$x_i$$ is correctly recovered with a good marginal probability.
> We want that all bits $$x'_i$$'s are correct with a good joint probability,
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
> $$
> \Pr[ y \gets U_n: y \in \Supp(X)] \ge 1-\eps,
> $$
> where $$\Supp(X) := \set{x : \Pr[X = x] \gt 0}$$ denotes the support of $$X$$.

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

#### **Theorem:** Leftover Hash Lemma [Mazor-Pass 2023, Lemma 3.4]

{:.theorem}
> Let $$n\in\N, \eps \in [0,1]$$, and let $$X$$ be a random variable over $$\bit^n$$.
> Let $$M \gets \bit^{n\times n}$$ and a random matrix, and let 
> $$
> \ell \le H_\infty(X) - 3 \log(1/\eps) - 4 \log n - 4.
> $$
> Then,
> $$
> \Delta((M,(M\odot x)_{1..\ell}), (M, U_\ell)) \le \eps,
> $$
> where $$M\odot x$$ denotes the matrix multiplication modulo 2,
> $$(z)_{1..\ell}$$ denotes the first $$\ell$$ bits of $$z$$,
> and $$U_\ell$$ denotes the uniform distribution over $$\bit^\ell$$.

{:proof-title}
> Example:
> 
> Consider a distribution $$X \in \bit^n$$ such that 
> $$H_\infty(X) = k$$ for some $$k \in [0,n]$$.
> Let $$M$$ be the matrix sampled as in LHL, 
> and let $$\ell$$ be defined w.r.t. $$k$$ as in LHL.
> Sample $$z \gets \bit^\ell$$ uniformly at random.
> Then, for any $$\eps \in [0,1]$$, we have that
> $$
> \Pr_{M,z}[\exists x \text{~s.t.~} p_X(x) > 0] \ge 1 - \eps,
> $$
> where $$p_X(\cdot)$$ denotes the probability mass function of $$X$$.


