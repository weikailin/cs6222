---
layout: page
title: 5. Authentication
nav_order: 5
nav_exclude: false
---

$$
\newcommand{\Gen}{\mathsf{Gen}}
\newcommand{\Tag}{\mathsf{Tag}}
\newcommand{\Ver}{\mathsf{Ver}}
\newcommand{\Sign}{\mathsf{Sign}}
\newcommand{\taccept}{\text{accept}}
\newcommand{\twin}{\text{ win}}
$$
{: .d-none}

Authentication
================

When people communicate through written words,
signatures and seals are applied to ensure that the written message
is *exactly* the same from the sender to the receiver.
Notice that the sender must share some information with the receiver *up front*,
for example, the receiver must have known the signature of the sender.

In this section, we will discuss digital methods which make
it difficult to “forge” a “signature.” Just as with encryption, there
are two different approaches to the problem based on whether
private keys are allowed: message authentication codes and digital
signatures. Message Authentication Codes (MACs) are used in
the private key setting. Only people who know the secret key
can check if a message is valid. Digital Signatures extend this
idea to the public key setting. Anyone who knows the public key
of Alice can verify a signature issued by Alice, and only those
who know the secret key can issue signatures. [Ps, p133]

Message Authentication Codes (MAC)
-------------------------



#### **Definition:** MAC

{:.defn}
> $$(\Gen, \Tag, \Ver)$$ is a message authentication code (MAC) over 
> the message space $$\set{\cM_n}_n$$ if the following syntax, correctness, and security hold:
> 
> - $$\Gen$$ is a PPT algorithm that returns a key $$k \gets \Gen(1^n)$$.
> - $$\Tag$$ is a PPT algorithm that on input key $$k$$ and message $$m$$ outputs a tag $$\sigma \gets \Tag_k(m)$$.
> - $$\Ver$$ is a deterministic polynomial-time algorithm that on input $$k, m$$ and $$\sigma$$ 
>   outputs “accept” or “reject”.
> 
> Correctness: For all $$n \in\N$$, for all $$m \in \cM_n$$,
> 
> $$
> \Pr[k \gets \Gen(1^n) : \Ver_k(m, \Tag_k(m)) = \taccept] = 1.
> $$
> 
> Security: for all NUPPT adversaries $$A$$, there exists a negligible function $$\eps(n)$$
> such that
> 
> $$
> \Pr\left[
> \begin{array}{l}
> k \gets \Gen(1^n);\\
> (m, \sigma) \gets A^{\Tag_k(\cdot)}(1^n)
> \end{array}
>  ~:~
> \begin{array}{l}
> A \text{ did not query } m \text{, and }\\ 
> \Ver_k(m, \sigma) = \taccept
> \end{array}
> \right] \le \eps(n)
> $$

Discuss:

- The adversary $$A$$ is allowed to oracle query $$\Tag_k$$. Is that too strong as $$A$$ gets too much info? 
  What if we totally remove the oracle query?
  What if the adversary gets some $$(x, \Tag_k(x))$$ pairs but only for challenger-chosen $$x$$'s?
- The adversary $$A$$ aims to forge a tag for *arbitrary message* $$m$$. Is that too strong since useful messages are not arbitrary?
- Can we change the definition to that $$A$$ wins only if it outputs a good key?
- Can this definition prevent an adversary that *replays* a (message, tag) pair? 
  Replay can be a devastating attack in many applications, such as financial transactions.
- If we additionally give the adversary oracle access to verification $$\Ver_k$$, is the definition stronger?
- Does the existence of MAC imply the existence of OWF? If so, what's the construction?

The above questions provide intuitions to our first MAC candidate.

#### **Construction:** Warmup, Information-Theoretic MAC

{:.defn}
> Define the following functions
> 
> - $$\Gen(1^n): k \gets \bit^n$$.
> - $$\Tag_k(m)$$: Output $$m \oplus k$$.
> - $$\Ver_k(m, \sigma)$$: Ouptut “accept” if and only if $$m \oplus k = \sigma$$.

This MAC is clearly *insecure* if the adversary can oracle query $$\Tag_k$$ once:
given any pair $$(m, \sigma = m \oplus k)$$, it is trivial to recover $$k$$.
However, the MAC is actually *Information-Theoretically* (and perfectly) secure
when the adversary can not obtain any pair.
Hence, it is called IT-MAC and is indeed used in some cryptographic protocols
(which we don't have time to cover).

Noticing that the above output of $$\Tag$$ is *uniformly* random,
we construct a MAC that outputs a *psuedorandom* string.

#### **Construction:** MAC

{:.defn}
> Let $$F = \set{ f_s}$$ be a family of pseudorandom functions such that 
> $$f_s : \bit^{|s|} \to \bit^{|s|}$$.
> 
> - $$\Gen(1^n): k \gets \bit^n$$.
> - $$\Tag_k(m)$$: Output $$f_k(m)$$.
> - $$\Ver_k(m, \sigma)$$: Ouptut “accept” if and only if $$f_k(m) = \sigma$$.

#### **Theorem:**

{:.theorem}
> If there exists a pseudorandom function, then the above scheme is a 
> Message Authentication Code over the message space $$\bit^n$$.

{:.proof-title}
> Proof Sketch:
> 
> The correctness is direct, and the security is argued below.
> 
> Consider a hybrid scheme and the corresponding hybrid experiment such that
> a random function $$RF$$ is used instead of the PRF $$f_k$$.
> The hybrid scheme is indistinguishable from the real construction
> by the oracle indistinguishability of PRF and then by a standard reduction
> (for any NUPPT adversary).
> Next, in the hybrid experiment, we claim that any adversary 
> can only win with probability at most $$2^{-n}$$:
> if the adversary queries $$m$$, it is always rejected;
> otherwise, the adversary can only output $$\sigma = RF(m)$$ w.p. $$2^{-n}$$
> (for even unbounded adversaries).

#### From fixed-length to arbitrary length

The above definition and construction consider MAC for messages in space $$\cM_n$$ so that
the length is fixed.
Of course, to handle arbitrarily long messages,
we can instantiate the PRF in the construction with a PRF scheme of arbitrary length.
However, existing
practical pseudorandom functions (i.e., block ciphers) take short, ﬁxed-length inputs.
It is necessary in practice to handle some subtleties, and this is called "domain extension" in general.

1. Split a long message into a sequence of short "blocks" and then $$\Tag$$ each.
2. Include a sequence number into each block (to prevent reordering attack).
3. Append to every block the total length (to prevent truncation attack).

There are other approaches, such as CBC-MAC (which is *only secure when* 
the message length is "ﬁxed and agreed upon in advance", see [KL, Exercise 4.13]).
We skip the details of the constructs.

Cryptographic Hash Functions
-------------------------

Hash functions are used in many areas of computer science, and in general,
all areas require that the function is *shrinking*;
that is, the output is shorter than the input of the function.

In cryptographic applications like MAC, we want a hash function $$h$$ to be
*collision-resistant*.
That is, give an input $$m$$ and its corresponding output $$h(m)$$, 
it is computationally hard to find $$m' \neq m$$ such that $$h(m') = h(m)$$.
There are several formal definitions, and we discuss only two below.

Ref: [Ps 5.5] [KL 9.3]

#### **Definition:** Universal One-Way Hash Functions

{:.defn}
> A set of functions 
> $$H = \set{h_k : \bit^{d(n)} \to \bit^{r(n)}, n = |k|}_{k \in \bit^\ast}$$ is 
> a family of *universal one-way hash functions (UOWHF)* if:
> 
> - (compression) $$r(n) \lt d(n)$$.
> - (ease of evaluation) Given $$k \in \bit^n$$ and $$x \in \bit^{r(n)}$$, the computation of $$h_k(x)$$ can be done in PPT in $$n$$.
> - (collision resistance) for all NUPPT $$A$$, there exists a negligible $$\eps$$ such that $$\forall n \in \N$$,
>   $$A$$ wins the following game w.p. $$\le \eps(n)$$:
>   
>   1. $$(x, state) \gets A(1^n)$$
>   2. $$k \gets \bit^n$$
>   3. $$x' \gets A(1^n, k, state)$$
>   4. $$A$$ wins if $$x' \neq x$$ and $$f_k(x') = f_k(x)$$

{:.proof-title}
> Example:
> 
> Suppose $$H = \set{h_i: \bit^* \to \bit^{|i|}}_{i \in \bit^*}$$ is a family of UOWHF.
> Let $$(\Gen, \Tag, \Ver)$$ be a MAC for $$2n$$ bit messages,
> where $$n$$ is the security parameter (given to $$\Gen$$).
> Then the following is also a MAC for arbitrarily long (polynomial in $$n$$) messages:
> 
> - $$\Gen'$$ is identical to $$\Gen$$.
> - $$\Tag'_k(m)$$: sample $$i \gets \bit^n$$, compute $$y \gets h_i(m)$$, 
>   then output $$(i \| y \| \Tag_k(i \| y))$$.
> - $$\Ver'_k(m, \sigma = i' \| y' \| \sigma')$$: 
>   accept iff $$h_{i'}(m) = y'$$ and $$\Ver_k(i'\|y', \sigma')$$ accepts.
>   
> Here, we upgraded the MAC to work for messages longer than $$2n$$.

Question: in the definition of UOWHF, we allow $$A$$ to choose $$x$$. 
Why or where we use such property in the example?

#### **Definition:** Collision-Resistant Hash Functions

{:.defn}
> A set of functions $$H = \set{h_i : D_i \to R_i}_{i\in I}$$ and algorithm $$\Gen$$ is 
> a family of *collision-resistant hash functions (CRHF)* if:
> 
> - (ease of sampling) $$i\gets \Gen(1^n)$$ runs in PPT, $$i \in I$$.
> - (compression) 
>   $$|R_i| \lt |D_i|$$.
> - (ease of evaluation) Given $$i \in I$$ and $$x \in R_i$$, the computation of $$h_i(x)$$ can be done in PPT.
> - (collision resistance) for all NUPPT $$A$$, there exists a negligible $$\eps$$ such that $$\forall n \in \N$$, 
>   
>   $$
>   \Pr[i \gets \Gen(1^n); (x, x') \gets A(1^n, i) ~:~ h_i(x) = h_i(x') \wedge x \neq x'] \le \eps(n).
>   $$

**Note**{:.label}
Because the adversary $$A$$ chooses both $$x$$ and $$x'$$,
the key $$k$$ is necessary to defend against non-uniform adversaries;
otherwise, a non-uniform $$A$$ can just remember a colliding pair $$(x,x')$$
for every problem size $$n\in \N$$.
Many practical hash functions (such as SHA) are unkeyed and do not satisfy this definition.

A CRHF is a UOWHF and also a OWF, and we can construct UOWHF from OWF.
However, it is long open whether we can get CRHF from OWF.
Instead, CRHF is contructed from various concrete assumptions, 
and CRHF is also constructed from "trapdoor permutations", 
which is yet another primitive that we do not know how to obtain from OWF.
We will use [*discrete logarithm* assumption](#Assumption-Discrete-Log) below.

{:.label}*Discuss:*
Suppose that $$H_k$$ is a CRHF or UOWHF (for some corresponding key $$k$$ and key generation). Let $$H'_k$$ be the function that truncates the last output bit of $$H_k$$. Is the resulting $$H'$$ and the key generation a good CRHF (or UOWHF)? Is there a counterexample such that $$H$$ is secure but $$H'$$ is not?

### Hash-and-MAC
Using either collision-resistant hash functions (CRHF) or even UOWHF, we have a standard way to extend the message space of any MAC scheme (or digital signature, discussed later). That is, whenever we want to sign (or tag) a message $$m$$, we sample a key $$s$$ of the hash function $$h$$ then compute the hash value $$v := h_s(m)$$ and then compute the signature as $$\sigma:=(s, \Tag_k(v))$$, where $$\Tag$$ and $$k$$ are the tagging algorithm and the key of the given MAC scheme. The verification of $$(m,\sigma)$$ is contructed accordingly.

**Note:**{: .label}
In the textbook [KL, Construction 6.5], the key $$s$$ of the hash function is generated once for all messages, and thus $$s$$ is kept secret from the adversary. (CRHF and UOWHF both gives the key to the adversary, so the proof does not use the full property.)

**Note:**{: .label}
Practical hash functions are typically using variants of SHA that are currently implemented directly in mainstream processors, including AMD, Intel, and Arm since 2015--2017. Also notice that SHA is a function but NOT keyed, while people have not find any collision.


Digital Signature Schemes
-------------------------

> With message authentication codes, both the signer and verifier need to share a secret key.
> In contrast, digital signatures mirror real-life signatures in that anyone who knows Alice 
> (but not necessarily her secrets) can verify a signature generated by Alice.
> Moreover, digital signatures possess the property of *non-repudiability*, 
> i.e., if Alice signs a message and sends it to Bob, 
> then Bob can prove to a third party (who also knows Alice) the validity of the signature. 
> Hence, digital signatures can be used as certificates in a public key infrastructure.
> 
> -- [Ps, Section 5.3]

Ref: [KL 13.1, 13.2, 13.6]

#### **Definition:** Digital Signatures

{:.defn}
> $$(\Gen, \Sign, \Ver)$$ is a digital signature scheme over the message space $$\set{\cM_n}_n$$ 
> if the following syntax, correctness, and security are satisfied:
> 
> - $$\Gen(1^n)$$ is a PPT which on input $$n$$ outputs a public key $$\pk$$ and a secret key $$\sk$$, $$(\pk, \sk) \gets \Gen(1^n)$$. 
> - $$\Sign$$ is PPT algorithm which on input a secret key $$\sk$$ and message $$m \in \cM_n$$ 
>   outputs a signature $$\sigma \gets \Sign_\sk(m)$$.
> - $$\Ver$$ is a deterministic poly-time algorithm which on input a public key $$\pk$$, 
>   a message $$m$$ and a signature $$\sigma$$ returns either “accept” or “reject”.
> 
> Correctness:
> For all $$n \in \N$$, for all $$m \in \cM_n$$,
> 
> $$ 
> \Pr[\pk, \sk \gets \Gen(1^n) : \Ver_\pk(m, \Sign_\sk(m)) = \taccept] = 1
> $$
> 
> Security:
> For all NUPPT adversaries $$A$$, there exists a negligible function $$\eps(n)$$ such that
> $$\forall n \in \N$$,
> 
> $$
> \Pr\left[
> \begin{array}{l}
> \pk,\sk \gets \Gen(1^n);\\
> (m, \sigma) \gets A^{\Sign_\sk(\cdot)}(1^n, \pk)
> \end{array}
>  ~:~
> \begin{array}{l}
> A \text{ did not query } m \text{, and }\\ 
> \Ver_\pk(m, \sigma) = \taccept
> \end{array}
> \right] \le \eps(n)
> $$

Discuss:

- $$\pk$$ must be sent to the verifier through an athenticated way (by definition in the above).
  If we have that authenticated way, why do we just use MAC?
- Would it be meaningful if $$A$$ gets no oracle access to $$\Sign_\sk$$? 
  The adversary $$A$$ is given $$\pk$$ as input. 
- Would it be meaningful if $$A$$ gets oracle access to $$\Sign_\sk$$ but *only once*?
- The definition is a public-key version of MAC.
- Since the verification uses only public key, $$A$$ can perform verification without oracle queries.
- Hence, it is clear that DS implies MAC, and then it implies OWF.
- Can we obtain a digital signature from (public-key) encryption?

The following theorem shows that signing $$n$$-bit messages is sufficient
because we can extend the message space through hashing.

#### **Theorem:** (Extending message space)

{: .theorem}
> Suppose that $$(\Gen, \Sign, \Ver)$$ is a digital signature scheme 
> over the message space $$cM_n$$ such that $$n \in \N$$ is the security parameter
> (given as input to $$\Gen$$).
> Also suppose that $$\set{f_k : \bit^* \to \bit^n, n = |k|}_{n\in\N}$$ is 
> a family of UOWHF.
> Then, the following is a digital signature scheme over the message space 
> $$\cM_{\poly(n)}$$ for any polynomial $$\poly$$.
> 
> - $$\Gen'$$ is the same as $$\Gen$$
> - $$\Sign'_\sk(m)$$:
>   sample $$k\gets \bit^{n/2}$$ uniformly at random,
>   compute $$h \gets f_k(m)$$,
>   run $$\sigma' \gets \Sign_\sk(k \| h)$$,
>   and then output $$\sigma := (k \| \sigma')$$.
> - $$\Ver'_\pk(m, \sigma)$$:
>   parse $$\sigma = (k \| \sigma')$$,
>   compute $$h \gets f_k(m)$$,
>   accept if $$\Ver_\pk(k \| h, \sigma')$$ accepts.


Lamport’s Signature Scheme
-------------------------

Refs: [KL 14.4], [Lamport'79](https://lamport.azurewebsites.net/pubs/dig-sig.pdf), [Goldwasser@Berkeley](https://inst.eecs.berkeley.edu/~cs276/fa20/slides/lec12.pdf)

#### **Definition:** One-Time Digital Signatures

{:.defn}
> $$(\Gen, \Sign, \Ver)$$ is a *one-time* digital signature scheme 
> the definition of DS is satisfied under the constraint that the adversary $$A$$ 
> is only allowed to query the signing oracle *once* (in $$A^{\Sign_\sk(\cdot)}$$).

#### **Construct:** Lamport's Digital Signature

{:.defn}
> Let $$f: \bit^\ast \to \bit^\ast$$ be a OWF.
> Given $$n \in \N$$, $$(\Gen, \Sign, \Ver)$$ is constructed as follows for $$\cM_n := \bit^n$$.
> 
> $$\Gen(1^n)$$:
> 
> 1. Sample strings $$x_b^i \gets \bit^n$$ for $$i \in [n], b \in \bit$$.
> 2. Compute $$y_b^i = f(x_b^i)$$ for all $$i, b$$
> 3. Output $$\pk := (y_b^i)_{i,b}$$ and $$\sk := (x_b^i)_{i,b}$$.
> 
> $$\Sign_\sk(m)$$:
> 
> 1. Output $$\sigma := (x_{m_i}^i)_{i\in[n]}$$, where $$m_i$$ denotes the $$i$$-th bit of $$m$$.
> 
> $$\Ver_\pk(\sigma)$$:
> 
> 1. Output $$\taccept$$ iff for all $$i \in [n]$$, it holds that
>    $$f(x_{m_i}^i) = y_{m_i}^i$$, where $$x_{m_i}^i$$ comes from $$\sigma$$ and $$y_{m_i}^i$$ comes from $$\pk$$.

#### **Theorem:**

{: .theorem}
> If $$f$$ is a one-way function, then [Lamport's Signature](#lamports-signature-scheme) is a secure one-time digital signature
> (for $$n$$-bit messages).
> 
> As a corollary, the construction extends to messages of $$\ell$$ bits such that
> $$\ell := \ell(n)$$ is a polynomial.

**Note**{:.label}
Many other public-key cryptographic schemes (such as public-key encryption)
relied on stronger assumptions (such as PKE from RSA assumption), 
and we do not know any construction from OWF.
Digital signature is a big surprise since we get it from OWF.

{:.proof-title}
> Proof sketch.
> 
> We want to prove by contradiction: 
> if there exists $$A$$ that makes one-time query $$m'$$ and 
> then forges the message and signature $$(m, \sigma)$$ with $$m \neq m'$$,
> then we want to construct another adversary $$\cB$$ that inverts $$f$$.
> The intuition is that given $$m \neq m'$$, there exists a bit $$m_i \neq m'_i$$ for some $$i$$,
> and then in order to pass the verification of $$(m, \sigma)$$, 
> $$A$$ must be able to find the pre-image of the $$i$$-th entry of $$\pk$$, which is inverting $$f$$.
> 
> The tricky step is that in the reduction, we need to give $$\pk$$ to $$A$$ up front.
> Since we have no idea about $$i$$ at that step, we are going to guess it.
> 
> More formally, assume for contradiction, there exists NUPPT adversary $$A$$ and polynomial $$p$$
> such that for infinitely many $$n \in \N$$, 
> 
> $$
> \Pr[A \twin] \ge 1/p(n),
> $$
> 
> where $$A \twin$$ denotes the event that $$m \neq m'$$ and $$\Ver_\pk(m, \sigma) =$$ accept in the security game.
> We want to construct $$B$$ that inverts $$f$$.
> 
> Let $$z \gets f(x)$$ and $$x \gets \bit^n$$. $$B$$ is constructed as below.
> 
> {:.defn-title}
>> Algorithm $$B(1^n, z)$$:
>> 
>> 1. Sample $$\pk := (y\_b^i)\_{i,b}$$ and $$\sk := (x\_b^i)\_{i,b}$$ as per Lamport's key generation.
>> 2. Sample $$b^\ast \gets \bit, i^\ast \gets [n]$$ uniformly at random.
>> 3. Modify $$\pk$$ by setting $$y_{b^\ast}^{i^\ast} \gets z$$.
>> 4. Run $$A^{\Sign_\sk(\cdot)}(\pk)$$: 
>>    if $$A$$ queries $$m'$$ such that $$m'\_{i^\ast} = b^\ast$$, then output $$\bot$$ ("fail" symbol);
>>    otherwise, respond to $$A$$ the signature as per $$\Sign\_\sk$$.
>>    Let the result be $$(m, \sigma)$$.
>> 5. If $$m_{i^\ast} \neq m'_{i^\ast}$$, then output $$\sigma$$ (as a candidate pre-image of $$z$$);
>>    output $$\bot$$ otherwise.
> 
> Notice that $$A$$ can not know $$b^\ast$$ nor $$i^\ast$$ 
> because all entries in $$\pk$$ are identically distributed.
> Hence, $$\Pr[m'\_{i^\ast} \neq b^\ast] = 1/2$$, and $$\Pr[m\_{i^\ast} \neq m\_{i^\ast}] \geq 1/n$$.

Tree-based Signatures
-------------------------

Ref: [KL 14.4.2, 14.4.3]

How to extend one-time signature to sign many messages?
When signing a message, we can *additionally generate the next pair of $$(\pk_1,\sk_1)$$*
and then sign and send the next $$\pk_1$$ with the current message, 
and so on for the next messages.
The verifier needs to verify and to keep the next $$\pk_1$$.
That is, both the signer and verifier need to keep states, 
or the signing / verification time is linear in the number of signed messages.

To improve it, we use tree-based approach.
That is, for each pair $$(\pk, \sk)$$, we sign *two* public keys $$\pk_0, \pk_1$$,
and then each $$\pk_b$$ (together with the corresponding $$\sk_b$$) can further sign two keys $$\pk_{b0}, \pk_{b1}$$,
and so on.
We build a tree of $$2^n$$ leaves so that we can sign up to $$2^n$$ messages,
and the first signature consists of $$n$$ one-time signatures:

$$
\sigma := (\pk, \sigma_0, (\pk_0, \pk_1), \sigma_1, (\pk_{00},\pk_{01}), ..., \sigma_{n-1}, (\pk_{0^n},\pk_{00...01}), \Sign_{\sk_{00...0}}(m)),
$$

where $$\sigma_i \gets \Sign_{\sk_{0^i}}(\pk_{0^i 0},\pk_{0^i 1})$$.
The second, thrid, and forth signatures and so on are moving the path from
$$000...00$$ to $$000...01$$ and then to $$000...10$$ and so on.
Because all the $$(\pk_x, \sk_x)$$ pairs are one-time, the signer keeps a state 
that counts the number of messages signed so far and all the $$(\pk_x, \sk_x)$$ pairs generated so far
so that the next message is signed consistently.
The verifier is stateless and keeps only $$\pk$$.

The above scheme can be further improved to achieve a *stateless signer* 
by using a PRF to generate the randomess needed by each tree node.
That is, let $$x$$ be a string of less then $$n$$ bits that indicates the tree node,
and let $$f_k$$ be a PRF with key $$k$$ sampled one-time up front,
and then we can use $$f_k(x)$$ be the randomness needed by node $$x$$
(since we need only two $$\Gen$$ and one $$\Sign$$ at each tree node).
Key $$k$$ is added to be part of the secret key, 
and signer can always generate the identical $$(\pk_x, \sk_x)$$ at node $$x$$.

Discuss:

- If the number of messages is not given in advance, how to build a DS?

**Notice**{:.label .label-blue}
If we plug Lamport's signature into the above composition, then
the length of the signature will *grow exponentially* because
the public key is *much longer* than the message (and we sign the $$\pk$$'s).
An easier "fix" is to shrink the message to a shorter "hash" and then sign the hash.
That is, the signer S and verifier V agree on a keyed hash function $$h_k$$,
S computes the (shorter) hash $$h_k(m)$$ from message $$m$$ so that S can sign the hash and V can verify.
Of course, we need a secure hash function so that any adversary given $$k$$ can not 
forge another $$m' \neq m$$ but $$h_k(m') = h_k(m)$$.
This property is called *targeted collision resistant hash functions* or *universal one-way **hash** functions* (UOWHF).
Such hash functions can be constructed from one-way functions.
We omit the proof here and give CRHF below since UOWHF is implied by CRHF.
Historically, [Naor and Yung](https://dl.acm.org/doi/10.1145/73007.73011 "Universal One-Way Hash Functions and their Cryptographic Application, STOC 1989") formalized UOWHF and constructed it from one-way permutations,
and then [Rompel](https://dl.acm.org/doi/10.1145/100216.100269 "One-Way Functions Are Necessary and Sufficient for Secure Signatures, STOC 1990") constructed UOWHF from any OWF.
[Goldreich, FoC, Vol 2, Section 6.4.3] shows the result of Naor and Yung, 
and Rompel's result is later proved formally by [Katz and Koo](https://eprint.iacr.org/2005/328 "On Constructing Universal One-Way Hash Functions from Arbitrary One-Way Functions").
Similar to PRG, it is still active research, e.g., 
[Mao, Nazor, and Zhang](https://eprint.iacr.org/2022/431 "Non-Adaptive Universal One-Way Hash Functions from Arbitrary One-Way Functions, Eurocrypt 2023")
improved the construction to be *non-adaptive* (ie parallel) calls to OWF.
<!-- 
"Winternitz one-time signature" is another approach, and it can be based on PRF (and thus OWF)
see [Zhang, Cui, and Yu](https://eprint.iacr.org/2023/850.pdf "Revisiting the Constant-Sum Winternitz One-Time Signature with Applications to SPHINCS+ and XMSS, Crypto 2023").
 -->

**Postscript**{. label}
Leslie Lamport wrote a great note on ["How To Present a Paper"](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/How-to-Present-a-Paper.pdf) in 1979. That is decades old and just two pages, but it is still inspiring and pure gold on good presentations.


Collision-Resistant Hash Functions
-------------------------

#### **Definition:** Generator of a Group

{:.defn}
> A element $$g$$ of a multiplicative group $$G$$ is a generator 
> if the set $$\set{g, g^2, g^3, ...} = G$$.
> We denote the set of all generators of a group $$G$$ by $$\Gen(G)$$.


#### **Assumption:** Discrete Log

{:.defn}
> If $$G_q$$ is a group of prime order $$q$$, then for every adversary $$A$$, there exists a negligible function $$\eps$$ such that
> 
> $$
> \Pr [ q \gets \Pi_n; g \gets \Gen(G_q) ; x \gets \Z_q : A(q, g, g^x) = x ] \lt \eps(n).
> $$

In the above definition, the group $$G_q$$ is not instantiated.
Hence the hardness of the DL problem depends on $$G_q$$, and indeed for some groups such as $$(\Z_q, +)$$ it is trivial.
In crypto, it is believed that DL is hard on the subgroup $$G_q$$ of $$\Z^\ast_p$$ for prime $$p$$.
Notice that the order of $$\Z^\ast_p$$ is even $$p-1$$, not prime order (and thus DL may be easy).
Therefore, we sample a prime of the form $$p = 2q + 1$$:
first sample prime $$q$$ and then let $$p = 2q + 1$$ if $$2q + 1$$ is also prime,
otherwise repeatedly sample another $$q$$.
Such primes are known as Sophie Germain primes or safe primes.

> Unfortunately,
> even though this procedure always terminates in practice, its
> basic theoretical properties are unknown. It is unknown even (a)
> whether there are an infinite number of Sophie Germain primes,
> (b) and even so, whether this simple procedure for finding them
> continues to quickly succeed as the size of $$q$$ increases.
> -- [Ps, Section 2.8.1]

Also notice that DL is a one-to-one mapping, 
and the domain and range are the same in cardinality.
However, the representations of elements (in bits) can be quite different,
and thus it is not exactly a one-way *permutation* (strictly speaking).

### Sampling prime-order group and the generator

#### **Theorem:**

{:.theorem}
> Let $$p = 2q + 1$$ with $$p,q$$ prime. Then
> 
> $$
> G := \set{ h^2 \mod p : h \in \Z^\ast_p}
> $$
> 
> is a subgroup of $$\Z^\ast_p$$ of order $$q$$.

{:.proof}
> It is direct that $$G$$ is a subgroup.
> It remains to prove the order, and it suffices to show that $$f(h) = h^2 \mod p$$ is 2-to-one
> (because $$|G| = |f(\Z^\ast_p)| = (p-1)/2 = q$$).
> Let $$g$$ be a generator of $$\Z^\ast_p$$ (proof omitted: the existence of generator of $$\Z^\ast_p$$)
> Let $$h \in \Z^\ast_p$$ such that $$h = g^t$$ for some $$t \le p-1$$.
> Consider any $$h_2$$ such that $$h_2^2  =h^2 \mod p$$ where $$h_2 = g^{t_2}$$.
> We have $$g^{2t_2} = g^{2t}$$, and $$2(t_2 - t) = 0 \mod (p-1)$$.
> Thus by $$p-1 = 2q$$, either $$t_2 = t$$ or $$t2 - t = 0 \mod q$$.
> 
> This proof extends to $$h^r$$ for all even integer $$r \ge 2$$.
> Moreover, it also shows that sampling from $$G$$ uniformly at random is efficient:
> just sample $$h$$ and compute $$h^2 \mod p$$.

#### **Construction:** CRHF from DL

{:.defn}
> $$\Gen(1^n)$$: output $$(p,q,g,y)$$, where
> 
> - $$p,q$$ are $$n$$-bit primes that $$p=2q+1$$, 
> - $$g$$ is the generator of $$G_q$$, 
> - $$y \gets G_q$$, and
> - $$G_q$$ is order $$q$$ subgroup of $$\Z^\ast_p$$.
> 
> $$h_{p,q,g,y}(x, b)$$: Output $$y^b g^x \mod p$$, where
> 
> - $$x$$ is $$n$$-bit, $$b$$ is 1-bit


#### **Theorem:**

{:.theorem}
> Under the Discrete Logarithm assumption, the above construction is a collision-resistant hash function 
> that compresses by 1 bit.

{:.proof-title}

> Proof sketch:
> 
> It is efficient, and the compression follows by $$n+1$$ to $$n$$ bits mapping
> (strictly speaking, that is $$2p$$ to $$p$$ as $$x \in [p]$$).
> To prove collision resistance, firstly consider the case $$h(x,b) = h(x', b)$$ but $$x \neq x'$$.
> Then, we have
> 
> $$
> g^{x} = g^{x'} \mod p
> $$
> 
> which means that $$x = x'$$. Hence, it must be $$x \neq x', b \neq b'$$ but $$h(x,b) = h(x',b')$$.
> Given $$b \neq b'$$, suppose $$b=1, b' = 0$$ (this is without loss of generality as $$b=0$$ otherwise).
> Then,
> 
> $$
> y^1 g^x = y^0 g^{x'} \mod p
> $$
> 
> which implies that
> 
> $$
> y = g^{x'-x} \mod p.
> $$
> 
> Thus, we can compute the DL of $$y$$ using any adversary $$A$$ 
> that on input $$y$$ outputs a collision $$(x,b) \neq (x',b')$$.

Note: the above construction is based on the DL assumption w.r.t. the prime order group $$G_q$$.
We can analogously construct CRHF from group $$\Z^\ast_p$$ based on the DL assumption w.r.t. $$\Z^\ast_p$$.
