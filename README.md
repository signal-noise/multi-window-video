<!-- 
First things first:
* Make sure the repo only allows 'squash and merge' on the settings panel.
* Set head branches to be deleted after a PR is merged
* Consider adding code analysis to the repo, including using dependabot
* Add branch protection rules to `master` and block direct pushing to master and only allow via approved PRs.
* Make sure there are issue labels for 'bug', 'epic' and project sizes ('S','M','L' will do)
* Add tooling from the relevant gist for linting
* Setup pre-production hosting
* Make sure there's a slack channel and that deploybot and github are integrated
* Ensure the CI config looks OK
* Edit this document to be relevant
* Delete this commment
-->

<!-- Badges go here - e.g. CircleCI -->
# Project Name

> Project short description

<!-- A screenshot of the project -->

## Contacts and documents

Who is involved in the project? Where are the designs and other working files?

## Architecture

Description and perhaps diagram of how the project works, based on the first 2 
or 3 levels of the https://c4model.com/.

### Specifics

For each main component (e.g. `client`), a run-down of the technologies and 
general approach, as well as any watch-outs.

## Getting started

Guide to getting going on the project; how to get a development environment 
sorted out.

## Rules and tools

Are we using our standard approach to [workflow](https://www.notion.so/signalnoise/Workflow-dee5654bdde040a78352dbbceada5814), 
[linting and tooling](https://www.notion.so/signalnoise/Tools-and-services-0293826f65894a3eabec01916aa7b318)? If not 
specify the exceptions and rationale.
