# Summary
[summary]: #summary

Create microservice for Auto Schedule using gRPC protocol using protobuf.

# Motivation
[motivation]: #motivation

So we decided to use google or-tools as the most optimized solution for Auto Schedule feature, and since this libray is huge and complex appropriately 2.8 GB, putting this giant code to kraken is an overhead. We decided to use microservice approach to solve this issue. 

This library is developed using c++ and support several wrappers like python and java, but unfortunately not js. We can create our own js wrapper, but it will be huge task to maintain the wrapper and the AS model, so instead we will use python instance as a microservice.

# Drawbacks
[drawbacks]: #drawbacks

Maybe only serveral member can mantain the code as it's written in python and use gRCP protocol.

# Guide-level explanation
[guide-level-explanation]: #guide-level-explanation

## Remote-Procedure-Call (RPC) Vs (Representational State Transfer) REST
gRPC is a technology for implementing RPC APIs that uses HTTP 2.0 as its underlying transport protocol. Both REST and gRPC communicate over http but instead of HTTP/1 gRPC use HTTP/2. 

RPC style endpoints are great when you want only one job done well. This makes it useful for one or two app clients because it is a niche service. RPC endpoints can implement business logic inside the service, given that it only does one thing. This adds simplicity and clarity to the service.

For a REST endpoint, you must treat it like a resource that provides domain data. The reward is you are now segregating data into separate domains. This makes it useful for when you have any number of apps requesting data. This approach attempts to decouple data from application or business logic.

## One simple rule of thumb is this:

If an API is mostly actions, maybe it should be RPC.
If an API is mostly CRUD and is manipulating related data, maybe it should be REST.

## Protocol buffer
By default, gRPC uses Protocol Buffers, Google’s mature open source mechanism for serializing structured data.The first step when working with protocol buffers is to define the structure for the data you want to serialize in a proto file: this is an ordinary text file with a .proto extension. Protocol buffer data is structured as messages, where each message is a small logical record of information containing a series of name-value pairs called fields. Here’s a simple for our microservice:

```proto
syntax = "proto3";

package autoschedule;

// The AutoSchedule service definition.
service AutoSchedule {
  rpc GenerateSchedule (GenerateScheduleInput) returns (GenerateScheduleOutput) {}
}

/** 
  we use uint32 since protobuf will turn it into JSON string if we use uint64, and also uint32 will cover the input range
  https://developers.google.com/protocol-buffers/docs/proto3#json\
  optional flag will allow 0 value to be sent by protobuf since by default 0 is ignored
**/
message Day {
  optional uint32 start = 1;
  uint32 end = 2;
}

message ShiftSlot {
  optional uint32 shiftSlotId = 1;
  optional uint32 start = 2;
  optional uint32 end = 3;
  uint32 hours = 4;
}

message StaffDict {
  string userId = 1;
  uint32 dailyOtLimit = 2;
  uint32 weeklyOtLimit = 3;
  uint32 score = 4;
  optional uint32 fulltime = 5;
}

message GenerateScheduleInput {
  map<uint32, Day> days = 1;
  map<uint32, ShiftSlot> shiftSlots = 2;
  map<uint32, StaffDict> staffDicts = 3;
}

message Schedule {
   repeated string schedule = 1;
}

message GenerateScheduleOutput {
  map<string, Schedule> schedules = 1;
}
```
gRPC uses protoc with a special gRPC plugin to generate code from your proto file: you get generated gRPC client and server code, as well as the regular protocol buffer code for populating, serializing, and retrieving your message types.

## Happy Flows
 - Kraken request to AS micro service
 - Micro service will only recieved clean data, all validation will be done by kraken.
 - AS microservice call worker thread to execute the AS model
 - AS microservice will confirm to kraken without waiting the worker thread to finish
 - the worker thread finish and use the webhook address to send back to kraken
 - kraken recieve the schedule 

# Reference-level explanation
[reference-level-explanation]: #reference-level-explanation

## ~~Impact on existing systems and concepts~~

~~Explain~~ ~~**briefly**~~ ~~how existing concepts will be affected~~

- ~~algorithms and systems (e.g. timesheet algorithm)~~
- ~~concepts (e.g. limit variance)~~
- ~~endpoints, operations and services~~
- ~~models and interfaces~~
- ~~screens and flows~~
## ~~Algorithms~~
- ~~new algos?~~
- ~~explain the changes to existing algos~~

# Reference-level explanation

This is the technical portion of the RFC. Explain the design in sufficient detail that:

- Its interaction with other features is clear.
- It is reasonably clear how the feature would be implemented.
- APIs should be provided where possible
- Corner cases are dissected by example.

## Implementation outline
## Backend - Interactions with existing systems and concepts

Explain **in detail** how existing concepts will be altered as a result

**python server**

 - Kraken request with sending to AS micro service
 - Micro service will only recieved clean data, all validation will be done by kraken.
 - AS microservice call worker thread to execute the AS model
 - AS microservice will send 200 without waiting the worker thread to finish
 - the worker thread finish and use the webhook address to send back to kraken
 - kraken recieve the schedule 


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
