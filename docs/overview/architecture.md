---
sidebar_position: 1
---

# Architecture

## Autobase Console

TBD

## PostgreSQL Cluster

Autobase supports three deployment schemes:

### 1. High-Availability Only

This is a basic high-availability scheme without load balancing.

#### Components:

- [**Patroni**](https://github.com/zalando/patroni) is a template for building customized PostgreSQL high-availability solutions using a distributed configuration store such as etcd, Consul, or ZooKeeper. Patroni runs on each PostgreSQL node, continuously monitors the local PostgreSQL instance, and coordinates cluster state through the DCS. The node that holds the leader lock acts as the primary; if it becomes unavailable, eligible replicas participate in a leader race, and the first one that acquires the leader lock promotes itself to the new primary.

- [**etcd**](https://github.com/etcd-io/etcd) is a reliable distributed key-value store for critical data in distributed systems. etcd is written in Go and uses the [Raft](https://raft.github.io/) consensus algorithm to manage a highly available replicated log. Patroni uses etcd to store cluster state and PostgreSQL configuration parameters. [What is Distributed Consensus?](http://thesecretlivesofdata.com/raft/)

Optional:

- [**vip-manager**](https://github.com/cybertec-postgresql/vip-manager) runs on all cluster nodes and connects to the DCS. If the local node owns the leader key, vip-manager starts the configured VIP. During failover, vip-manager removes the VIP from the old leader, and the service on the new leader starts it there. It provides a single entry point (VIP) for database access. It is not available for cloud environments.

- [**PgBouncer**](https://pgbouncer.github.io/features.html) is a connection pooler for PostgreSQL. It is useful when applications create many short-lived connections or when the number of client connections is higher than PostgreSQL should handle directly. PgBouncer reuses server-side connections, reduces connection overhead, and helps protect PostgreSQL from connection spikes.

### 2. High-Availability with Load Balancing

This scheme enables load distribution for read operations and allows the cluster to scale out with read-only replicas.

When deploying to cloud providers such as AWS, GCP, Azure, DigitalOcean, and Hetzner Cloud, a cloud load balancer is automatically created by default to provide a single entry point to the database.

For non-cloud environments, such as Your Own Machines deployments, the HAProxy load balancer is available. \
List of ports when using HAProxy:

- port 5000 (read/write primary)
- port 5001 (read-only, all replicas)
- port 5002 (read-only, synchronous replica only)
- port 5003 (read-only, asynchronous replicas only)

:::info
Your application must support sending read requests to a custom address and port.
:::

#### Components:

- [**HAProxy**](http://www.haproxy.org/) is a fast and reliable solution for high availability, load balancing, and proxying for TCP and HTTP-based applications.

Optional:

- [**confd**](https://github.com/abtreece/confd) manages local application configuration files using templates and data from etcd or Consul. It is used to automate HAProxy configuration management.

- [**Keepalived**](https://github.com/acassen/keepalived) provides a highly available virtual IP address (VIP) and a single entry point for database access. It implements VRRP (Virtual Router Redundancy Protocol) for Linux. In the Autobase configuration, Keepalived checks the status of the HAProxy service and, in case of failure, moves the VIP to another server in the cluster. It is not available for cloud environments.

### 3. High-Availability with Consul Service Discovery

In this scheme, Consul [Service Discovery](https://developer.hashicorp.com/consul/docs/concepts/service-discovery) with [DNS resolution](https://developer.hashicorp.com/consul/docs/discovery/dns) is used as a client access point to the database. It is also suitable for primary access and read load balancing across replicas using DNS. Example:

- master.postgres-cluster.service.consul
- replica.postgres-cluster.service.consul

This scheme can also be useful for distributed clusters across multiple data centers. You can specify the data center where each database server is located, then use that information for applications running in the same data center. Example:

- replica.postgres-cluster.service.dc1.consul
- replica.postgres-cluster.service.dc2.consul

It requires Consul in client mode on each application server for service DNS resolution. Alternatively, use [DNS forwarding](https://developer.hashicorp.com/consul/tutorials/networking/dns-forwarding?utm_source=docs) to a remote Consul server instead of installing a local Consul client.
