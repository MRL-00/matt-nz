---
title: Notes on shipping a SwiftUI app from Christchurch
date: 2026-02-03
tags: [swift, indie]
excerpt: A loose collection of things I wish someone had told me before I started tide.nz. App Store Connect from a NZ timezone is a particular kind of cruel; CloudKit is wonderful right up until it isn't.
draft: false
location: Christchurch, NZ
---

A loose collection of things I wish someone had told me before I started tide.nz.

## The timezone problem

App Store Connect from a NZ timezone is a particular kind of cruel. Apple's review queue moves on Cupertino time, which means a "submitted" build at 4pm Friday Christchurch is "submitted" at 9pm Thursday for the reviewer, and a rejection lands in your inbox at 3am Saturday morning when you cannot do anything about it.

The fix is the boring one: do not submit on Fridays. Submit Tuesday or Wednesday, in the morning. Treat the review window like a meeting you cannot reschedule.

## CloudKit, mostly

CloudKit is wonderful right up until it isn't. It is wonderful for the first six months: free tier is generous, the schema migrations are sane enough, and the `NSPersistentCloudKitContainer` integration genuinely does most of what it says.

It stops being wonderful the first time a user tells you their data hasn't synced for three days and you have no diagnostic tools at your disposal beyond "have you tried signing out of iCloud."

*[continued]*
