---
title: The ergonomics of structured concurrency in .NET 9
date: 2025-11-18
tags: [.net, concurrency]
excerpt: Channels are great. CancellationToken threading is not. Here is the pattern I've landed on after a few production rewrites — one that mostly stays out of the way until the request gets cancelled.
draft: false
location: Christchurch, NZ
---

Channels are great. `CancellationToken` threading is not.

## The shape of the problem

Most of the .NET services I've worked on in the last few years have a similar shape: an HTTP handler kicks off two or three concurrent operations, all of which need to be cancelled cleanly when the client disconnects, and any of which failing should cancel the others.

The C# language gives you the primitives. It does not give you the patterns. What follows is the pattern I've landed on after a few production rewrites — one that mostly stays out of the way until the request gets cancelled, at which point it does the right thing without ceremony.

*[continued]*
