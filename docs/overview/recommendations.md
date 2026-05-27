---
sidebar_position: 4
---

# Recommendations

This section provides recommendations to improve the performance, stability, and reliability of your PostgreSQL cluster. Following these guidelines helps you avoid common pitfalls and get the most out of your deployment.

### Linux (Operating System)

Before deploying your PostgreSQL cluster, make sure the target servers are running an up-to-date operating system. Proper system maintenance is important for security and performance.

Ensure that time synchronization is correctly configured with NTP. For automated setup, specify `ntp_enabled: true` and set `ntp_servers` to install and configure the NTP service.

### Distributed Consensus Store (DCS)

The performance and stability of your etcd or Consul cluster depend heavily on fast storage and a reliable network. To improve reliability:

- Avoid storing etcd or Consul data on the same disk as other resource-intensive processes, such as PostgreSQL. Store DCS data and PostgreSQL data on **separate** disks (`etcd_data_dir`, `consul_data_path` variables), and use SSDs if possible.
- Deploy your DCS cluster on dedicated servers, separate from your database servers, to minimize resource contention.
- For further optimization, consult the [hardware recommendations](https://etcd.io/docs/v3.5/op-guide/hardware/) and [tuning guides](https://etcd.io/docs/v3.5/tuning/).

### Placement of Cluster Members Across Different Data Centers

For setups involving multiple data centers, DCS (etcd or Consul) member placement is critical. Avoid placing all DCS members in a single primary data center, because losing that data center can make the cluster unavailable. Place members across failure domains while preserving quorum. For detailed guidance, see these [examples](https://www.cybertec-postgresql.com/en/introduction-and-how-to-etcd-clusters-for-patroni/).

### Preventing Data Loss During Automatic Failover

Synchronous replication is disabled by default for performance reasons. To minimize the risk of data loss during automatic failover, enable and configure synchronous replication:

- `synchronous_mode: true`
- `synchronous_mode_strict: true`
- `synchronous_commit: 'on'` (or `remote_apply`)

These settings help ensure that committed transactions are acknowledged by at least one replica, reducing the risk of data loss.
