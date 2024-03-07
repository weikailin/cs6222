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

**Location:** Thornton Hall E303 ![UVA Engineering](assets/images/uva-eng.png){:style="vertical-align: middle;"}

Instructor and TA Information
------------------------------

**Instructor:** Wei-Kai Lin [(audio)](https://www.name-coach.com/wei-kai-lin-4568fe92-7831-4780-a68c-361f76dee197), email: wklin-course (at virginia dot edu)

**TA:** Elena Long

Office Hours
------------

**Office hour:** Thursdays 3:30-4:30pm (after Thursday classes).
Location: Rice 505.

**TA hour:** Tuesdays 3:30-4:30pm (after classes).

Course Work
--------------

The course work consist of the following.

- (50%) Written homework
- (24%) Programming project
- (10%) In class activity and discussion
- (16%) Final exam, written
- (5%, bonus) Quizzes, occasional

The final grade will follow the [CS Department guidelines](https://uvacsadvising.org/policies.html#cs-department-grading-guidelines).

We will use the [Canvas](https://canvas.its.virginia.edu) website to manage homework, exam, and grades. Please also use the discuss page on Canvas if you have course related questions.

### Homework and Project Policy

The homework submissions shall be PDF and typeset in Tex/Latex (template will be provided).
The programming project will use python.

Every student shall submit homework individually. You are free to discuss with other students in this class, but in that case, you shall add an **Acknowledgement** paragraph explicitly. Similarly, you are allowed to make use of published material as long as you cite it properly with a **References** section. In any case, it is a violation if you copy text directly, or if you are unable to explain your solution orally.

There may be additional rules for some homework questions.

### Final exam

Time: 9am - 12pm, 5/10, Friday, last day of finals.
Same room. 
This is the same as [UVA schedule](https://registrar.virginia.edu/exam-schedule-spring-2024).

This will be in person and written one.
No collaboration is permitted on the exams. 
Students may construct a one-page (letter-size, two-sided) reference sheet for use 
during the exam, but all other resources are forbidden (no internet, textbook, other humans, magnification instruments, etc.).

### Honor System

The goal of this course is to define and prove security. Ideally, all your course works shall be based on the materials given in the classroom and references. You are encouraged to read other materials, but searching for **ready-made solutions is discouraged** because it hurts the goal. Similarly, please try not to ask for solution from people out of this class, and please try not to use generative AI.

It is a violation if any of the following cases happens:
 - You copied text directly (from any source).
 - You used any material or discussion without acknowledgement or citation.
 - You are unable to explain your work orally.

Everyone is required to follow the [Honor Codes of UVA](https://honor.virginia.edu/academic-fraud) and avoid [plagiarism](https://honor.virginia.edu/plagiarism-supplement). You are recommended to use a version control system, such as Overleaf or git, so that your thought process justifies the authenticity.

Please also read [detailed policies](uva_support.md) on the use of AI, accommodations, and supports.

Course Outline
--------------

Textbooks:
- Rafael Pass and abhi shelat.
  A Course in Cryptography. 
  \[Ps\] for short.

  Available here:
  [http://www.cs.cornell.edu/courses/cs4830/2010fa/lecnotes.pdf](http://www.cs.cornell.edu/courses/cs4830/2010fa/lecnotes.pdf)


- Jonathan Katz and Yehuda Lindell.
  Introduction to Modern Cryptography.
  \[KL\] for short.

  Online access in UVA library:
  [https://search.lib.virginia.edu/sources/uva_library/items/u10203454](https://search.lib.virginia.edu/sources/uva_library/items/u10203454)

Lecture notes will be provided on this website,
so the textbooks are optional.

### Syllabus (tentative)

In the first half, we focus on the necessary properties behind cryptographic primitives,
including one-wayness, computational indistinguishability, and pseudo-randomness,
and we show the direct implications such as encryption and authentication.
In the second half, we move on to more applications as well as recent progresses in cryptography.
The tentative topics are listed below.

1.  Introduction and scope. Logistics. Preliminaries.  
    Match-making. Security definition.
2.  Shannon's definition. One-time pads. Limitation of information theoretic approach.
3.  Efficient computations and efficient adversaries
4.  Private-key encryption, computational indistinguishability 
5.  Pseudo-random generators (PRG)
6.  CPA-secure encryption, pseudo-random functions (PRF)
7.  Message authentication codes (MAC). 
8.  One-way functions (OWF).
9.  Strong OWF from weak OWF (hardness amplification). Universal OWF.
10. Prime Number Theorem. Factoring problem. Miller-Rabin primality testing. 
11. OWF from factoring assumption. 
12. Hard-core predicates. PRG from hard-core bits.
13. PRG from any OWF. 
14. Digital signature. Identification. 
15. Collision-resistant hash functions. Birthday attack. 
16. Zero-Knowledge proofs, commitment. 
17. Oblivious RAM. 
18. Public-key encryption. Trapdoor permutations.
19. Homomorphic encryption, Fully homomorphic encryption (FHE). 
20. Garbled circuits. Oblivious transfer (OT). Secure two-party computation. 
21. Secret-sharing. Secure multi-party computation. 
22. Private information retrieval (PIR).

Additional Course Material
---------------

\[CS6222 Introduction to Cryptography (UVA, Fall 2023)\]
[https://weikailin.github.io/cs6222-fa23/](https://weikailin.github.io/cs6222-fa23/)

\[Barak\]
An Intensive Introduction to Cryptography.
[https://intensecrypto.org/public/index.html](https://intensecrypto.org/public/index.html)

\[Goldreich\]  
The Foundations of Cryptography.
[https://www.wisdom.weizmann.ac.il/~oded/foc-book.html](https://www.wisdom.weizmann.ac.il/~oded/foc-book.html).  
[online access in UVA library](https://search.lib.virginia.edu/sources/uva_library/items/u8631726).

\[Vadhan\]
Pseudorandomness.
[https://people.seas.harvard.edu/~salil/pseudorandomness/pseudorandomness-published-Dec12.pdf](https://people.seas.harvard.edu/~salil/pseudorandomness/pseudorandomness-published-Dec12.pdf)

Mike Rosulek.
The Joy of Cryptography. 
[https://joyofcryptography.com/](https://joyofcryptography.com/)

David Evans, Vladimir Kolesnikov and Mike Rosulek.
A Pragmatic Introduction to Secure Multi-Party Computation.
https://securecomputation.org/main/