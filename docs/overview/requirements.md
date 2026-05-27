---
sidebar_position: 3
---

# Requirements

This page outlines the essential requirements for deploying and managing PostgreSQL clusters with Autobase.

### Console (UI)

For users of the Autobase Console (UI), the setup is simplified. You only need [Docker](https://docs.docker.com/engine/install/) to run the container.

The Console must have outbound HTTPS access to `https://billing.autobase.tech`. This endpoint is required to process subscription plan payments and issue signed entitlements used by the Platform API to verify billing access.

:::note
Ensure that inbound ports `80` and `443` are open to allow access to the Console UI.
:::

### Command line

All dependencies and source code are bundled into the `autobase/automation` Docker image.

You will need `root` access or a user with `sudo` privileges to access the servers via SSH. You can use your private SSH key (assuming the corresponding public key has already been added to the servers), or a username and password if password access is enabled on your servers.

### Port requirements

:::info
When deploying to cloud providers (such as AWS, GCP, Azure, DigitalOcean, and Hetzner Cloud) using the Console UI, all necessary ports are automatically configured during the creation of the Firewall/Security Group, controlled by the `cloud_firewall` variable.
:::

Required TCP ports for the database cluster:

- `5432` (PostgreSQL)
- `6432` (PgBouncer)
- `8008` (Patroni REST API)
- `2379`, `2380` (etcd)

For the "PostgreSQL High-Availability with Load Balancing" scheme:

- `5000` (HAProxy - read/write primary)
- `5001` (HAProxy - read-only, all replicas)
- `5002` (HAProxy - read-only, synchronous replica only)
- `5003` (HAProxy - read-only, asynchronous replicas only)
- `7000` (optional, HAProxy stats)

For the "PostgreSQL High-Availability with Consul Service Discovery" scheme:

- `8300` (Consul Server RPC)
- `8301` (Consul Serf LAN)
- `8500` (Consul HTTP API)
- `8600` (Consul DNS server)
