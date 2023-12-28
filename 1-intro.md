---
layout: page
title: 1. Introduction
nav_order: 1
nav_exclude: false
---

$
\newcommand{\Enc}{\mathsf{Enc}}
\newcommand{\Dec}{\mathsf{Dec}}
\newcommand{\Gen}{\mathsf{Gen}}
\newcommand{\cM}{\mathcal{M}}
\newcommand{\cK}{\mathcal{K}}
\newcommand{\card}[1]{\vert{#1}\vert}
$
{: .d-none}

Introduction
============

About me
--------------------------------------------
 - PhD: Cornell, postdoc: Northeastern
 - Undergrad major: chemistry
 - Worked in the industry as SE

About this course
--------------------------------------------
 - Goal: provable security, 1) define the desired security, 2) construct and prove a system
 - Rigorous and theoretic approach, comfortable with mathematical proofs
 - Prerequisites: Discrete Mathematics, Probability, Theory of Computation

Logistics
--------------------------------------------
 - Website (weikailin.github.io/cs6222-fa23), my email (wklin-course)
 - Office hours (Tue 9:30, Rice Hall 505)
 - Course works: 4 HW, final proj, final exam, quizzes
 - HW policies:

   The goal: critical def, rigorous proof, to solve future challenges
   
   1. in-class, reference, office hours
   2. other in-class students (ack)
   3. other pub (cite)
   4. ready-made solutions like other people, AI, solutions in prev courses (avoid)

   Eg, wrote your own, then google without edit. Good.
   Another eg, wrote your own, then google and edit. Shall cite or ack.

   Internalize your writeup. No direct copying. Must be explainable orally. Edit history (Overleaf) is recommended.

   See website for details.
 - Survey (quiz) due on Aug 23

A toy example: match-making
--------------------------------------------
Alice and Bob want to find out if they are meant for
each other. Each of them have two choices: either they love the
other person or they do not. Now, they wish to perform some
interaction that allows them to determine whether there is a
match (i.e., if they both love each other) or not—and nothing
more. For instance, if Bob loves Alice, but Alice does not love
him back, Bob does not want to reveal to Alice that he loves
her.

Note that the desired function is simply an AND gate that takes an input from Alice and an input from Bob.
Also, if we have a trusted third party Charlie, Charlie solve the problem.
The question is, can Alice and Bob compute AND without trusting any others?

#### The protocol
Assume that Alice and Bob have access to five
cards, three identical hearts(♥) and two identical clubs(♣). 
Also assume they have a round dish.

1. Put 1 heart face down on the top of dish.
2. Both A/B: encode Yes by heart-club, No by club-heart.
3. Both A/B: face down their cards on left/right of dish.
4. A secretly rotate the cards with dish
5. B secretly rotate the cards with dish
6. Open all cards, A-B are matched if and only if 3 hearts in a row.

#### Analysis
We need to show both correctness and privacy. 
The correctness is easy. The privacy can be argued by enumeration: 
all 3 cases {No-No, Yes-No, No-Yes} yield the same sequence (H,C,H,C,H) that is cyclic identical.

#### Discuss
Alternatively we can use 2 hearts and 3 clubs to compute AND.
To compute OR, we can encode Yes/No oppositely.
To compute XOR, we can use 2 hearts and 2 clubs.
Unfortunately, these protocols do not compose when we want to compose gates.


Course outline
--------------------------------------------
We will cover:
 - Essential primitives: one-way functions (OWF), pseudorandom generators (PRG), pseudorandom functions (PRF), encryption (symmetric key (SK), public key (PK)), authentication (message authentication codes (MAC), signatures)
   - Are they different / related? Sure, they serve different purposes. How to study them systematically?
   - Construction of the essentials (basic number theory and assumptions)
 - Modern crypto (cool stuff): zero-knowledge proofs (ZKP), secure two-party computation (2PC), secure multiparty computation (MPC), fully homomorphic encryption (FHE), my research (oblivious RAM (ORAM), doubly efficient private information retrieval (DEPIR), RAM-FHE)

![Topics in a tree](assets/images/outline-tree-plain.svg)

Related but almost NOT cover:
 - System security, cybersecurity (such as [CS 3710: Introduction to Cybersecurity](https://aaronbloomfield.github.io/ics/uva/index.html))
 - Blockchain
 - (Really math) Number theory
 - Quantum comp

Classical cryptography: hidden writing
--------------------------------------------
Historically, human considered the scenario of *encryption* in communication.
 - Alice ~~~ $m$ ~~~> Bob
Eavesdropper Eve, an adversary, may be listening on the channel. 

Alice/Bob want to hide the message from Eve. To do so, they share two algorithms $\Enc, \Dec$ secretly and before the communication.
 - Alice ~~~ $ct$ ~~~>Bob
 - $ct \gets \Enc(m)$, ciphertext, where $m$ is the plaintext
 - Bob recovers plaintext by $\Dec(ct)$
 - $y \gets A(x)$ denotes algo $A$ computes on input $x$ and gets output $y$.

Notice: it is important that which info is *public* (known to all A/B/E) and which is *private*. What if Eve knows $\Enc$ or $\Dec$?

### Kerchoff's principle

> The enemy knows the system.
>
> ~ Claude Shannon. Communication Theory of Secrecy Systems. The Bell System Technical Journal, 1949. [https://ieeexplore.ieee.org/document/6769090]

Reason: the algorithms are eventually leaked to Eve. We shall be conservative.

Consequence: let algos public, but keep a short secret key $k$.

Generalize: sample key $k \gets \Gen$

Note: $(\Gen, \Enc, \Dec)$ can not be all deterministic. What if only $\Gen$ is randomized?

### Classical encryption
Rotation, substitution, enigma, .... They are mostly broken now. DES? AES?

[Breaking German Army Ciphers](https://cryptocellar.org/bgac/)

Modern cryptography: provable security
--------------------------------------------
A principle driven *science* (instead of an art).
Modern cryptography relies on the following paradigms:

 - Providing mathematical definitions of security.
 - Providing precise mathematical assumptions (e.g. “factoring is hard”, where hard is formally defined).
 - Providing proofs of security, i.e., proving that, if some particular scheme can be broken, then it contradicts the assumption.

Definition of secure encryption
--------------------------------------------
We want to accurately model the A-B communication.

### Attempt 1
> The adversary cannot learn (all or part of) the key from the ciphertext.

It can leak the plaintext.

### Attempt 2
> The adversary cannot learn the plaintext from the ciphertext.

Leaking some function of the plaintext can be fatal.

### Attempt 3
> The adversary cannot learn *any function of, or any part of* the plaintext from the ciphertext.

The adversary may already learned something even not looking at ct.

### Intuitive Definition
> Given some *a priori* information, the adversary cannot learn any additional information about the plaintext by observing the ciphertext.

### Formal definition

Let $\cK$ be the space of keys, and let $\cM$ be the space of all messages.
We want to model the *information* as probability distributions.

#### **Definition:** Private-key encryption.

{: .defn}
> $(\Gen,\Enc,\Dec)$ is said to be a *private-key encryption scheme* over the messages space $\cM$ and the keyspace $\cK$ 
> if the following syntax holds.
> 
> 1. $\Gen$ is a randomized algorithm that returns a key $k \in \cK$. We denote by $k \gets \Gen$ the process of generating $k$.
> 2. $\Enc$ is a potentially randomized algorithm that on input a key $k\in\cK$ and a message $m \in \cM$, outputs a ciphertext $c$.
>    We denote by $c \gets \Enc_k(m)$ the computation of $\Enc$ on $k$ and $m$.
> 3. $\Dec$ is a deterministic algorithm that on input input a key $k$ and a ciphertext $c$ outputs a message $m \in \cM$.
>    We denote by $m' \gets \Dec_k(c)$ the computation of $\Dec$.
> 4. (Correctness.) For all $m \in \cM$,
>
>    $$
>    \Pr[k \gets \Gen : \Dec_k(\Enc_k(m)) = m] = 1.
>    $$  
>
>    (the probability is taken over the randomness of $\Gen, \Enc$.)
>

#### **Definition:** Shannon Secrecy.

{: .defn}
> The private-key encryption scheme $(\cM,\cK,\Gen,\Enc,\Dec)$ is *Shannon-secret with respect to the distribution $D$* over $\cM$ 
> if for all $m' \in \cM$ and for all $c$, 
> 
> $$
> \Pr[k \gets \Gen; m \gets D : \qquad m = m' \ | \  \Enc_k(m) = c] \quad = \quad \Pr[m \gets D : m = m'].
> $$
>
> An encryption scheme is said to be *Shannon secret* if it is Shannon secret with respect to all distributions $D$ over $\cM$.

The RHS is the distribution of messages without $c$. The LHS is the distribution *conditioned on observing $c$*.
Is the definition good if we skip the quantifier for "all distribution $D$"?

An alternative intuition is that the distribution of ciphertexts for any two messages are identical.

#### **Definition:** Perfect Secrecy.

{: .defn}
> The private-key encryption scheme $(\cM,\cK,\Gen,\Enc,\Dec)$ is *perfectly secret* 
> if for all $m_1, m_2 \in \cM$, and for all $c$,  
>
> $$
> \Pr[k \gets \Gen : \Enc_k(m_1) = c] \quad = \quad \Pr[k \gets \Gen : \Enc_k(m_2) = c].
> $$

Note: this definition is simpler and easier to use.

#### **Claim:**

{: .theorem}
> Perfect secrecy implies Shannon secrecy.

{: .proof-title}
> Proof:
> 
> Suppose that $(\cM,\cK,\Gen,\Enc,\Dec)$ is perfectly secret. For any $D$, any $c$, and any $\bar m$, we have
> 
> $$
> \Pr_{k,m}[m = \bar m | \Enc_k(m) = c] = \Pr_{k,m}[m = \bar m \cap \Enc_k(m) = c] / \Pr_{k,m}[\Enc_k(m) = c].
> $$
> 
> Then, we want to split the joint prob. so that we can cancel it with the denominator.
> They are not independent, so we rearrange
> 
> $$
> \begin{align*}
> & \Pr_{k,m}[m = \bar m \cap \Enc_k(m) = c] \\
> = & \Pr_{k,m}[\Enc_k(m) = c | m = \bar m] \Pr_m[m = \bar m]\\
> \end{align*}
> $$
> 
> We will write $\Pr_{k}[\Enc_k(\bar m)]$ instead of $\Pr_{k,m}[\Enc_k(m) = c | m = \bar m]$, 
> and we want to show it equals to $\Pr_{k,m}[\Enc_k(m)]$ (note $\bar m$ is not r.v. but $m$ is).
> 
> $$
> \begin{align*}
> & \Pr_{k,m}[\Enc_k(m) = c] \\
> = & \sum_{m' \in \cM} \Pr_{k}[\Enc_k(m') = c] \Pr_{m}[m = m'] \\
> = & \Pr_{k}[\Enc_k(\bar m) = c] \sum_{m' \in \cM} \Pr_{m}[m = m'] \\
> = & \Pr_{k}[\Enc_k(\bar m) = c] \cdot 1
> \end{align*}
> $$
> 
> The first eq is just sum of prob.
> The second use *perfect secrecy*: $\Pr_{k}[\Enc_k(\bar m) = c] = \Pr_{k}[\Enc_k(m') = c]$ for any $\bar m$ and $m'$.
> The third is also sum of prob.
> That implies
> 
> $$
> \Pr_{k}[\Enc_k(\bar m) = c] = \Pr_{k,m}[\Enc_k(m) = c].
> $$
> 
> That givens Shannon secrecy:
> 
> $$
> \begin{align*}
> & \Pr_{k,m}[m = \bar m | \Enc_k(m) = c] \\
> &  = \Pr_{m}[m = \bar m] \cdot \Pr_{k}[\Enc_k(\bar m) = c] / \Pr_{k,m}[\Enc_k(m) = c] \\
> &  = \Pr_{m}[m = \bar m].
> \end{align*}
> $$

#### **Claim:**

{: .theorem}
> Shannon secrecy implies perfect secrecy.

<!-- The proof is given in [Ps, Sec 1.3.2]. -->

One-Time Pad
--------------------------------------------

#### **Definition:** One-Time Pad.

{: .defn}
>The *One-Time Pad* encryption scheme is described by the following 5-tuple $(\cM, \cK, \Gen, \Enc, \Dec)$:
>
>- $\cM = \{0, 1\}^n$
>- $\cK = \{0, 1\}^n$
>- $\Gen$: $k := k_1 k_2 \dots k_n \gets \{0, 1\}^n$
>- $\Enc_k(m_1m_2\dots m_n)$: $c_1 c_2 \dots c_n$ where $c_i = m_i \oplus k_i$
>- $\Dec_k(c_1c_2\dots c_n)$: $m_1 m_2 \dots m_n$ where $m_i = c_i \oplus k_i$
>
> The $\oplus$ operator represents the binary XOR operation.

#### **Theorem:**

{: .theorem}
>One-Time Pad is a perfectly secure private-key encryption scheme.

{: .proof-title}
> Proof:
> 
> We need to prove correctness and privacy.


The cost of OTP is the long key $k$.

One-Time Pad is Optimal in Key Length
--------------------------------------------

#### **Theorem:** (Shannon)

{: .theorem}
> If scheme $(\cM, \cK, \Gen, \Enc, \Dec)$ is a perfectly secret private-key encryption scheme, then $\card{\cK} \geq \card{\cM}$.

{: .proof-title}
> Proof:
> 
> Let $c \gets \Enc_k(m)$ be a fixed ciphertext for some fixed $k, m$.
> Let $P := \\{m : \Dec_k'(c) = m \text{ for any } k' \\}$.
> We have $\card{P} \leq \card{\cK} \lt \card{\cM}$ as $\Dec$ is deterministic.
> So, there exists $m_2 \notin P$.
> Then, it follows that
> 
> $$
> \Pr_k[\Enc_k(m_2) = c] = 0
> $$
> 
> by correctness. However, we have $\Pr_k[\Enc_k(m) = c] \gt 0$, and it violates perfect secrecy.

Notice that we can quantify the difference of probability (which yields a stronger theorem) by quantifying $\card{\cK}$.

