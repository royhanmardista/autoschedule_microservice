- Feature Name: (fill me in with a unique ident, `my_awesome_feature`)
- Start Date: (fill me in with today's date, YYYY-MM-DD)
- RFC PR: [rust-lang/rfcs#0000](https://github.com/rust-lang/rfcs/pull/0000)
- Rust Issue: [rust-lang/rust#0000](https://github.com/rust-lang/rust/issues/0000)

# Summary
[summary]: #summary

Create microservice for Auto Schedule using gRPC protocol.

# Motivation
[motivation]: #motivation

So we decided to use google or-tools as the most optimized solution for Auto Schedule feature, and since this libray is huge and complex appropriately 2.8 GB, putting this giant code to kraken is an overhead. We decided to use microservice approach to solve this issue. 

This library is developed using c++ and support several wrappers like python and java, but unfortunately not js. We can create our own js wrapper, but it will be huge task to maintain the wrapper and the AS model, so instead we will use python instance as a microservice.

# Remote-Procedure-Call (RPC) Vs (Representational State Transfer) REST
[guide-level-explanation]: #guide-level-explanation

gRPC is a technology for implementing RPC APIs that uses HTTP 2.0 as its underlying transport protocol. Both REST and gRPC communicate over http but instead of HTTP/1 gRPC use HTTP/2.  

Explain the proposal as if it was already included in the language and you were teaching it to another Rust programmer. That generally means:

## When to use RPC?

An RPC endpoint is useful for working with a narrow view of the data. This reduces the bandwidth you use on the network and simplifies the service. You can be as specific or as narrow as you want as long as it does what you need. What is nice about RPC is that you have a way of creating services that do one job well.


## When to use REST?

A REST endpoint treats the request like making a call to a resource. The resource becomes the domain that has the data. The resource does not concern itself with functionality at all. It is only a place where you contain data and do with it as you see fit. What is nice about REST is that you have a resource API you can then call from many clients. REST API’s only concern is all the data that belongs to that specific domain.

## Conclusion

RPC style endpoints are great when you want only one job done well. This makes it useful for one or two app clients because it is a niche service. RPC endpoints can implement business logic inside the service, given that it only does one thing. This adds simplicity and clarity to the service.

For a REST endpoint, you must treat it like a resource that provides domain data. The reward is you are now segregating data into separate domains. This makes it useful for when you have any number of apps requesting data. This approach attempts to decouple data from application or business logic.

The answer to which style to implement is the usual “it depends.” A distributed large scale system may benefit from REST while a smaller monolithic one does not. MVC systems with a basic CRUD can benefit from RPC as long as there is little need to scale.

RPC-based APIs are great for actions (that is, procedures or commands).

REST-based APIs are great for modeling your domain (that is, resources or entities), making CRUD (create, read, update, delete) available for all of your data.

## One simple rule of thumb is this:

If an API is mostly actions, maybe it should be RPC.
If an API is mostly CRUD and is manipulating related data, maybe it should be REST.

# Reference-level explanation
[reference-level-explanation]: #reference-level-explanation

## gRPC

A second model for using HTTP for APIs is illustrated by gRPC. gRPC uses HTTP/2 under the covers, but HTTP is not exposed to the API designer. gRPC-generated stubs and skeletons hide HTTP from the client and server too, so nobody has to worry how the RPC concepts are mapped to HTTP—they just have to learn gRPC. 

The way a client uses a gRPC API is by following these three steps:

- Decide which procedure to call

- Calculate the parameter values to use (if any)

- Use a code-generated stub to make the call, passing the parameter values

# Drawbacks
[drawbacks]: #drawbacks

Why should we *not* do this?

# Rationale and alternatives
[rationale-and-alternatives]: #rationale-and-alternatives

- Why is this design the best in the space of possible designs?
- What other designs have been considered and what is the rationale for not choosing them?
- What is the impact of not doing this?

# Prior art
[prior-art]: #prior-art

Discuss prior art, both the good and the bad, in relation to this proposal.
A few examples of what this can include are:

- For language, library, cargo, tools, and compiler proposals: Does this feature exist in other programming languages and what experience have their community had?
- For community proposals: Is this done by some other community and what were their experiences with it?
- For other teams: What lessons can we learn from what other communities have done here?
- Papers: Are there any published papers or great posts that discuss this? If you have some relevant papers to refer to, this can serve as a more detailed theoretical background.

This section is intended to encourage you as an author to think about the lessons from other languages, provide readers of your RFC with a fuller picture.
If there is no prior art, that is fine - your ideas are interesting to us whether they are brand new or if it is an adaptation from other languages.

Note that while precedent set by other languages is some motivation, it does not on its own motivate an RFC.
Please also take into consideration that rust sometimes intentionally diverges from common language features.

# Unresolved questions
[unresolved-questions]: #unresolved-questions

- What parts of the design do you expect to resolve through the RFC process before this gets merged?
- What parts of the design do you expect to resolve through the implementation of this feature before stabilization?
- What related issues do you consider out of scope for this RFC that could be addressed in the future independently of the solution that comes out of this RFC?

# Future possibilities
[future-possibilities]: #future-possibilities

Think about what the natural extension and evolution of your proposal would
be and how it would affect the language and project as a whole in a holistic
way. Try to use this section as a tool to more fully consider all possible
interactions with the project and language in your proposal.
Also consider how this all fits into the roadmap for the project
and of the relevant sub-team.

This is also a good place to "dump ideas", if they are out of scope for the
RFC you are writing but otherwise related.

If you have tried and cannot think of any future possibilities,
you may simply state that you cannot think of anything.

Note that having something written down in the future-possibilities section
is not a reason to accept the current or a future RFC; such notes should be
in the section on motivation or rationale in this or subsequent RFCs.
The section merely provides additional information.
