---
layout: page
title: Table of Lecture Notes
nav_order: 0
nav_exclude: false
---

Table of Lecture Notes
========

| Date      | Topic                                     | References  |
| --------- | ----------------------------------------- | ----------- |
| Jan 18    | [Course outline, security definition](1-intro.md)  | [Ps 1.1-1.3], [KL 1.1,1.2,1.4,2.1] |
| Jan 23    | [Perfect security, one-time pads](1-intro.md)    | [Ps 1.3], [KL 2.1-2.3] |
| Jan 25    | [Efficient computation, adversary](2-owf.md#efficient-computation-and-efficient-adversaries), [PRG](3-prg#pseudo-random-generator)    | [Ps 2.1,3.1-3.2], [KL 3.1-3.3] |
| Jan 30    | [Computational indistinguishability](3-prg.md)    | [Ps 3.1] |
| Feb 1     | [Computational indistinguishability](3-prg.md)    | [Ps 3.1] |
| Feb 6     | [PRG](3-prg#pseudo-random-generator)    | [Ps 3.3], [KL 3.3] |
| Feb 8     | [Pseudo-random functions](3-prg.md#pseudo-random-functions)    | [Ps 3.7, 3.8] [KL 8.5] |
| Feb 13    | [CPA-secure encryption](3-prg.md#secure-encryption-scheme)    | [Ps 3.9] [KL 3.2, 3.4] |
| Feb 15    | [Pseudo-random functions](3-prg.md#pseudo-random-functions)    | [Ps 3.7, 3.8] [KL 8.5], [Abhishek@JHU](https://www.cs.jhu.edu/~abhishek/classes/CS600-642-442-Fall2018/L05.pdf), [Goldwasser@Berkeley](https://inst.eecs.berkeley.edu/~cs276/fa20/slides/lec5.pdf), [Wichs@Northeastern](https://www.khoury.northeastern.edu/home/wichs/class/crypto-fall15/lecture9.pdf) |
| Feb 20    | [One-way functions](2-owf.md#definition-of-one-way-functions)    | [Ps 2.2] [KL 8.1] |
| Feb 22    | [Factoring, reduction](2-owf.md#primes-and-factoring)    | [Ps 2.3-2.4], [KL 9.2.3] |
| Feb 27    | [From weak to strong OWF](2-owf.md#from-weak-owf-to-strong-owf)    | [Ps 2.4], [Wichs@NEU](https://www.ccs.neu.edu/home/wichs/class/crypto-fall17/lecture10.pdf), [Goldwasser@Berkeley](https://inst.eecs.berkeley.edu/~cs276/fa20/slides/lec7.pdf), [LTW05](https://lucatrevisan.github.io/pubs/LTW05.pdf) |
| Feb 29    | [Universal OWF](2-owf.md#a-universal-owf)    | [Ps 2.13], [Wichs@NEU](https://www.ccs.neu.edu/home/wichs/class/crypto-fall17/lecture10.pdf) |
| Mar 12    | [Hard-core lemma](4-gole.md)    | [Ps 3.4] [KL 8.3.3] [Bellare@UCSD](https://cseweb.ucsd.edu/~mihir/papers/gl.pdf) |
| Mar 14    | [Hard-core lemma](4-gole.md#warmup-assumption-2)    | [Ps 3.4] [KL 8.3.3] [Bellare@UCSD](https://cseweb.ucsd.edu/~mihir/papers/gl.pdf) |

| Apr 30    | (last lecture)    |  |

<!-- 
| Sep 4     | [Factoring, reduction](2-owf.md#primes-and-factoring)    | [Ps 2.3-2.4], [KL 9.2.3] |
| Sep 6     | [From weak to strong OWF](2-owf.md#from-weak-owf-to-strong-owf)    | [Ps 2.4], [Wichs@NEU](https://www.ccs.neu.edu/home/wichs/class/crypto-fall17/lecture10.pdf), [Goldwasser@Berkeley](https://inst.eecs.berkeley.edu/~cs276/fa20/slides/lec7.pdf), [LTW05](https://lucatrevisan.github.io/pubs/LTW05.pdf) |
| Sep 11    | [Primality testing](2-owf.md#primality-testing)    | [KL 9.2.2] |
| Sep 13    | [Finish Miller-Rabin, universal OWF](2-owf.md#a-universal-owf)    | [Ps 2.13], [Wichs@NEU](https://www.ccs.neu.edu/home/wichs/class/crypto-fall17/lecture10.pdf) |
| Oct 4     | [Construct PRG, hard-core lemma](3-prg.md#hard-core-bits-from-any-owf)    | [Ps 3.4] [KL 8.1.3,8.2,8.3] |
| Oct 9     | [Hard-core lemma](3-prg.md#hard-core-bits-from-any-owf)    | [Ps 3.4] [KL 8.3.3] [Bellare@UCSD](https://cseweb.ucsd.edu/~mihir/papers/gl.pdf) |
| Oct 11    | [Recitation, pairwise independent hash, entropy](3-1-prg-const.md)    | [V, Pseudorandomness] [Barak@Princeton](https://www.cs.princeton.edu/courses/archive/spr08/cos598D/scribe3.pdf) |
| Oct 16    | [Weak pseudo-entropy generator](3-1-prg-const.md#weak-pseudo-entropy-generator-peg)    | [Barak@Princeton](https://www.cs.princeton.edu/courses/archive/spr08/cos598D/scribe3.pdf) |
| Oct 18    | [Pseudo-entropy generator](3-1-prg-const.md#peg-from-weak-peg)    | [Barak@Princeton] |
| Oct 23    | [From PEG to PRG](3-1-prg-const.md#prg-from-peg)    | [Barak@Princeton] |
| Oct 25    | [Message Authentication](4-auth.md)    | [Ps 5.1, 5.2] [KL 4.1-4.3] |
| Oct 30    | [Digital Signatures](4-auth.md#digital-signature-schemes)    | [Ps 5.3] [KL 13.1, 13.2, 13.6, 14.4], [Lamport'79](https://lamport.azurewebsites.net/pubs/dig-sig.pdf), [Goldwasser@Berkeley](https://inst.eecs.berkeley.edu/~cs276/fa20/slides/lec12.pdf) |
| Nov 1     | [Collision-resistant hash, discrete log](4-auth.md#collision-resistant-hash-functions)    | [Ps 5.5] [KL 9.3] |
| Nov 6     | [Zero-knowledge proofs, commitments](5-zkp.md)    | [Ps 4.1-4.6] |
| Nov 8     | [ZKP for graph 3-coloring](5-zkp.md#graph-3-coloring)    | [Ps 4.7-4.9] |
| Nov 13    | [Learning with errors, homomorphic encryption](6-enc.md)    | [KL 14.3] |
| Nov 15    | [Public-key encryption, multiplicative HE](6-enc.md#public-key-encryption-from-additive-homomorphic-encryption)    | [Rothblum, TCC 2011](https://www.iacr.org/archive/tcc2011/65970216/65970216.pdf), [BV, FOCS 2011](https://eprint.iacr.org/2011/344.pdf) [BGV, ITCS 2012](https://people.csail.mit.edu/vinodv/6892-Fall2013/BGV.pdf) |
| Nov 20    | [Bootstrapping FHE, PIR](6-enc.md#fully-homomorphic-using-bootstrapping)    | [Gentry, STOC 2009](https://dl.acm.org/doi/10.1145/1536414.1536440), [LMW, STOC 2023](https://weikailin.github.io/cs6222-fa23/6-enc/eprint.iacr.org/2022/1703.pdf) |
| Nov 27    | [Shamir secret sharing](7-mpc.md#secret-sharing)    | [Ps 6.1], [Arora@Princeton](https://www.cs.princeton.edu/courses/archive/fall16/cos521/Lectures/lec21.pdf) |
| Nov 29    | [Yao's garbling, oblivious transfer](7-mpc.md#secret-sharing)    | [Ps 6.2], [Barak@Princeton](https://www.cs.princeton.edu/courses/archive/fall07/cos433/lec19.pdf) |
| Dec 4     | Project presentations    |  |
 -->