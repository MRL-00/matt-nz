---
title: Why I'm still betting on Go for backend services in 2026
date: 2026-04-12
edited: 2026-04-15
tags: [go, backend, opinion]
excerpt: Five years ago I would have written this in Kotlin. Three years ago, Rust. Today I keep reaching for Go for the same reason I reach for a Phillips screwdriver, it is rarely the most exciting tool in the drawer, and it is almost always the right one.
draft: false
location: Christchurch, NZ
---

Five years ago I would have written this in Kotlin. Three years ago, Rust. Today I keep reaching for Go for the same reason I reach for a Phillips screwdriver: it is rarely the most exciting tool in the drawer, and it is almost always the right one.

The argument I want to make is small. It is not that Go is the best language. It is not that you should rewrite your services. It is that, if I had to start a new backend in May 2026, with a team of four to six people, a five-year horizon, and a real on-call rotation, I would still pick Go. And I want to write down why so that the next time I get into a pub argument about it I can just send a link.

## A boring tool for a boring job

Most backend services are not interesting. They take a request, validate it, do something to a database, talk to two or three other services, and write a response. The hard parts are almost never the language. The hard parts are the data model, the boundaries between services, the failure modes, and the people you work with.

Go is an exceptionally boring language for this job. The standard library is large and stable. The toolchain is one binary. `go build` produces a single artifact you can `scp` to a box if you have to. There is exactly one obvious way to format the code, and it is not your way. You will get over this.

```sh
# the entire build pipeline, more or less
$ go test ./...
$ go build -o bin/api ./cmd/api
$ docker build -t api:$(git rev-parse --short HEAD) .
```

I have been on call for systems written in Scala, Node, .NET, and Go. The Go ones are not the most fun to work in. They are, by a comfortable margin, the easiest to debug at 2 a.m. with a bad signal at the bach.

## What I actually mean by "backend"

I want to be specific, because "backend" can mean a lot of different things and Go is not the right answer for all of them.

- HTTP and gRPC services that own a database, fronted by a load balancer.
- Long-running workers that drain a queue and call out to other services.
- The glue layer between your product and the four SaaS vendors you wish you didn't need.

For all three, Go does the thing. For data pipelines I would still reach for Python or Spark. For anything that is genuinely CPU-bound and latency-critical, Rust is now the obvious choice and it is not close. For mobile clients, please don't.

> The best backend language is the one your on-call engineer can read at 2 a.m. without coffee. Almost everything else is taste.

## The cost of a smaller language

Go is a small language. People mean different things by this; I mean that the part of the language you have to hold in your head to be productive is genuinely small. There is no `implicit`, no operator overloading, no macro system to chase, no four ways to spell the same loop…

*[… rest of post forthcoming — full essay is ~3,100 words across five sections.]*
