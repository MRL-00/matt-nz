---
title: Why I'm still betting on Go for backend services in 2026
date: 2026-04-12
edited: 2026-04-15
tags: [go, backend, opinion]
excerpt: Five years ago I would have written this in Java or .NET. Three years ago, Rust. Today I keep reaching for Go for the same reason I reach for a Phillips screwdriver, it is rarely the most exciting tool in the drawer, and it is almost always the right one.
draft: false
location: Christchurch, NZ
---
Ten years ago I would have written this in Java. Three to five years, .NET. Today I keep reaching for Go for the same reason I reach for a Phillips screwdriver: it is rarely the most exciting tool in the drawer, and it is almost always the right one.

The argument I want to make is small. It is not that Go is the best language. It is not that you should rewrite your services. It is that, if I had to start a new backend in May 2026, with a team of three to six people, and a five-year horizon, I would still pick Go. And I want to write down why so that the next time I get into a pub argument about it I can just send a link.

I should also say where this is coming from. We have spent the last stretch at AJ Hackett collapsing three separate .NET APIs that ran on the edge device at each jump site into one Go binary. Same hardware, same network, same humans on the bridge in the rain. A lot of the opinions below are paid for by that migration.

## A boring tool for a boring job

Most backend services are not interesting. They take a request, validate it, do something to a database, talk to two or three other services, and write a response. The hard parts are almost never the language. The hard parts are the data model, the boundaries between services, the failure modes, and the ~~people~~ environments you work with.

Go is an exceptionally boring language for this job. The standard library is large and stable. The toolchain is one binary. `go build` produces a single artifact you can `scp` to a box if you have to. There is exactly one way to format the code, `gofmt` decides what it is, and you do not get a vote. You will get over this.

The single-artifact thing is not a small detail when production lives on a fan-cooled Linux box at a jump site and the deploy window is the gap between groups. The old shape was three .NET services — three runtimes, three sets of logs, three things to restart in the right order when something got stuck, all running in Azure IoT (don't get me started). The new shape is one Go binary in one container. `docker pull`, restart, done. The deploy is incredibly fast, and you are back on the platform before the next one is harnessed up.

The pipeline does the boring parts. CI builds the image and pushes it to GCR on every merge. Deploying to a site is one line from a laptop:

```sh
$ ./scripts/setup.sh \
    --ip 0.0.0.0 \
    --name TestMachine \
    --user edge-user \
    --env-file environments/local.env \
    --version 0.2.4
```

That is the whole interface. Pick a box, pick a version, run it. There is no out-of-band config, no "did you remember to update IIS," no sequence of services that need to come up in a particular order. And because it is Go, the same code runs on whatever happens to be at the site — x86, ARM, older boxes, newer boxes, the one we have not bought yet.

## What I actually mean by "backend"

I want to be specific, because "backend" can mean a lot of different things and Go is not the right answer for all of them.

- HTTP and gRPC services that own a database, fronted by a load balancer.
- Long-running workers that drain a queue and call out to other services.
- The thing on the edge device at the jump site that talks to the hardware, the camera, the payment terminal, and HQ, and has to keep working when head office can't be reached.
- The glue layer between your product and your customers.


## The cost of a smaller language

Go is a small language. People mean different things by this; I mean that the part of the language you have to hold in your head to be productive is genuinely small. There is no `implicit`, no operator overloading, no macro system to chase, no four ways to spell the same loop…

*[… rest of post forthcoming — full essay is ~3,100 words across five sections.]*
