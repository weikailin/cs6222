---
layout: home
title: CS 4501 Cryptography
nav_exclude: true
permalink: /:path/
seo:
  type: Course
  name: Cryptography
---

Welcome to CS 4501, Cryptography!
----------------------------------------

Cryptographic primitives are applied almost everywhere on the network, for instance, encryption and authentication are necessary. In this course, we will start from the theoretic foundations that consolidates our belief in cryptography, and then we will visit some essential protocols as well as recent advances in cryptography. A major theme of this course is "provable security," that is, to define the desired security and then to rigorously prove the security is achieved. Hence, students are expected to be familiar with algorithms and mathematical proofs.

Please send me an email if you have questions.

Prerequisites
---------
[CS 3120 Discrete Mathematics and Theory 2](https://uvatoc.github.io/) or equivalent course is necessary.
Also, Probability (APMA 3100) is good-to-have.

This course requires DMT2 (CS3120) because it heavily relies on the concepts such as reductions, decision problems, NP-complete and computation models like Turing machines, and some ideas from complexity. The concepts are covered in DMT2 (and sometimes partly in DSA2, CS3100). Because they are required in both BSCS and BACS, they are used directly as preliminary knowledge in the course.
Also, reading and writing formal math proofs is necessary.

Classroom
---------

**Days and Times:** Tueday/Thursday 2:00-3:15 pm

**Location:** Thornton Hall E303 ![UVA Engineering](assets/images/uva-eng.png)

Instructor Contact Information
------------------------------

**Name:** Wei-Kai Lin [(audio)](https://www.name-coach.com/wei-kai-lin-4568fe92-7831-4780-a68c-361f76dee197)

**Email:** wklin-course (at virginia dot edu)

Office Hours
------------

**Days and Times:** Thursdays 3:30-4:30pm (after Thursday classes)

**Location:** Rice 505

Course Work
--------------

The course work is still tentative and subject to change as of Oct/Nov 2023.

- (50%) Written homework
- (24%) Programming project
- (10%) In class activity and discussion
- (16%) Final exam, written
- (5%, bonus) Quizzes, occasional

The final grade will follow the [CS Department guidelines](https://uvacsadvising.org/policies.html#cs-department-grading-guidelines).

We will use the [Canvas](https://canvas.its.virginia.edu) website to manage homework, exam, and grades. Please also use the discuss page on Canvas if you have course related questions.

### Homework Policy

The submissions shall be PDF and typeset in Tex/Latex (template will be provided).

Every student shall submit homework individually. You are free to discuss with other students in this class, but in that case, you shall add an "Acknowledgement" paragraph explicitly. Similarly, you are allowed to make use of published material as long as you cite it properly with a "References" section. In any case, it is a violation if you copy text directly, or if you are unable to explain your solution orally to me.

Each student have 4 "late days" for homework in this semester.

There may be additional rules for some homework questions.

### Exams

No collaboration is permitted on the exams. 
Students may construct a one-page (letter-size, two-sided) reference sheet for use 
during the exam, but all other resources are forbidden (no internet, textbook, other humans, magnification instruments, etc.).

### Honor System

The goal of this course is to define and prove security. Ideally, all your course works shall be based on the materials given in the classroom and references. You are encouraged to read other materials, but searching for ready-made solutions is discouraged because it hurts the goal. Similarly, please try not to ask for solution from people out of this class, and please try not to use generative AI.

It is a violation if any of the following cases happens:
 - You copied text directly (from any source).
 - You used any material or discussion without acknowledgement or citation.
 - You are unable to explain your work orally to me.

Everyone is required to follow the [Honor Codes of UVA](https://honor.virginia.edu/academic-fraud) and avoid [plagiarism](https://honor.virginia.edu/plagiarism-supplement). You are recommended to use a version control system, such as Overleaf or git, so that your thought process justifies the authenticity.

Please also read [detailed policies](uva_support.md) on the use of AI, accommodations, and supports.

Course Outline
--------------

We will use the textbooks of Rafael Pass and abhi shelat [Ps] and Katz and Lindell [KL].
In the first half, we focus on the necessary properties behind cryptographic primitives,
including one-wayness, computational indistinguishability, and pseudo-randomness,
and we show the direct implications such as encryption and authentication.
In the second half, we move on to more applications as well as recent progresses in cryptography.
The tentative topics are listed below.

1.  Introduction and scope. Logistics. Preliminaries.  
    Match-making. Security definition.
2.  Shannon's definition. One-time pads. Limitation of information theoretic approach.
3.  Efficient computations and efficient adversaries. One-way functions (OWF).
4.  Prime Number Theorem. Factoring problem. Weak OWF from factoring.
5.  Strong OWF from weak OWF (hardness amplification). Universal OWF.
6.  Miller-Rabin primality testing.
7.  Pseudo-random generators (PRG), indistinguishability, pseudo-random functions (PRF)
8.  CPA security and private-key encryption.
9.  Message authentication codes (MAC). Digital signature. Identification.
10. Hard-core predicates. PRG from hard-core bits.
12. Commitment. Zero-Knowledge proofs.  
13.  Public-key encryption. Trapdoor permutations.
14.  Collision resistant hash functions. Birthday attack.
15.  Oblivious algorithms. Oblivious RAM.
16.  Garbled circuits.      
17.  Oblivious transfer (OT). Secure two-party computation.  
18.  Secret-sharing. Secure multi-party computation.  
19.  Fully homomorphic encryption (FHE).
20.  Private information retrieval (PIR).

Course Material
---------------

\[Ps\]  
A Course in Cryptography. Rafael Pass and abhi shelat.  
[http://www.cs.cornell.edu/courses/cs4830/2010fa/lecnotes.pdf](http://www.cs.cornell.edu/courses/cs4830/2010fa/lecnotes.pdf)

\[KL\]  
Introduction to Modern Cryptography. Jonathan Katz and Yehuda Lindell.  
[https://www.cs.umd.edu/~jkatz/imc.html](https://www.cs.umd.edu/~jkatz/imc.html).  
[online access in UVA library](https://search.lib.virginia.edu/sources/uva_library/items/u10203454).

\[CS6222 Introduction to Cryptography (UVA, Fall 2023)\]
[https://weikailin.github.io/cs6222-fa23/](https://weikailin.github.io/cs6222-fa23/)

\[Barak\]
An Intensive Introduction to Cryptography
[https://intensecrypto.org/public/index.html](https://intensecrypto.org/public/index.html)

\[Goldreich, G\]  
The Foundations of Cryptography. Oded Goldreich.  
[https://www.wisdom.weizmann.ac.il/~oded/foc-book.html](https://www.wisdom.weizmann.ac.il/~oded/foc-book.html).  
[online access in UVA library](https://search.lib.virginia.edu/sources/uva_library/items/u8631726).

\[Vadhan, V\]
Pseudorandomness.
[https://people.seas.harvard.edu/~salil/pseudorandomness/pseudorandomness-published-Dec12.pdf](https://people.seas.harvard.edu/~salil/pseudorandomness/pseudorandomness-published-Dec12.pdf)

The Joy of Cryptography. Mike Rosulek 
[https://joyofcryptography.com/](https://joyofcryptography.com/)
