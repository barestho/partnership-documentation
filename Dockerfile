FROM node:lts-trixie-slim AS base

COPY . /documentation

RUN corepack enable pnpm

FROM base AS development

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt update \
    && apt install -y --no-install-recommends \
        git \
        curl \
        sudo \
    && usermod -aG sudo node \
    && echo "%sudo  ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers 

VOLUME [ "/documentation" ]

USER node

ENTRYPOINT [ "sleep", "infinity" ]