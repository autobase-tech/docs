---
sidebar_position: 3
---

# Dashboards

Click a cluster name on the **Clusters** page, then open **Monitoring**. Each cluster has its own monitoring page with **System**, **Postgres**, **PgBouncer**, **Tables**, and **Indexes** tabs.

The charts use metrics collected by the Netdata agents on the database nodes. See [Netdata integration](./overview.md#netdata-integration) for collection and retention details, or [open the full Netdata dashboard](#open-the-netdata-dashboard) to explore more metrics.

## Select nodes and a period

Use the toolbar to choose the nodes and time period you want to inspect:

- **Primary** selects the current primary node and follows changes to the primary role. It is the default node selection. You can also select individual nodes or **All nodes** to compare them.
- **Period** offers ranges from the last five minutes to the last year. Select an interval on a chart to inspect a custom historical range.
- **Refresh** reloads the data. The adjacent refresh controls let you choose an automatic refresh interval or turn automatic refresh off. Automatic refresh is paused for a custom historical range.
- **Database** filters database-specific metrics on the Postgres, PgBouncer, Tables, and Indexes tabs. Metrics that apply to the entire instance remain instance-wide.

Available history depends on Netdata retention, and longer periods may show coarser data.

## System

Use the **System** dashboard to inspect resource usage on the selected database nodes.

| Charts | What they show |
| --- | --- |
| CPU usage | CPU utilization by state. |
| Memory usage and swap usage | RAM and swap usage. |
| Disk I/O and disk IOPS | Read/write bandwidth and completed I/O operations per device. |
| Disk latency | Average time per completed I/O operation. |
| Disk space usage | Filesystem usage for the mount point containing the PostgreSQL data directory by default. Use the chart's filter to select a different mount point. |
| Network traffic | Received and sent traffic per network interface. |

Devices, mount points, and network interfaces remain separate so you can identify the resource contributing to load.

## Postgres

The **Postgres** dashboard covers database activity, connections, locking, I/O, replication, and maintenance.

| Charts or groups | What they show |
| --- | --- |
| Activity | Committed and rolled-back transactions, transaction age distribution, available and used connections, connections by state, and rows read and written. |
| Locks | Held locks, waiting locks, and deadlocks. |
| Cache / I/O | Buffer cache hit ratio, buffers written, and temporary file I/O. |
| WAL / Checkpoints | WAL write rate, WAL archive file counts, and checkpoints. |
| Replication | Replication lag in time and bytes, separated by replication application and WAL stage. |
| Autovacuum / Wraparound | Autovacuum worker activity and oldest transaction ID (XID) age. XID age is measured in transactions, not elapsed time. |
| Size | Database size over time. |

The transaction age heatmap shows the age of open transactions, including idle ones. Older transactions are at the top; brighter cells mean more observations.

## PgBouncer

The **PgBouncer** dashboard helps you inspect connection pooling and client wait times.

:::note
The **PgBouncer** tab is hidden when PgBouncer is disabled in the cluster configuration.
:::

| Charts or groups | What they show |
| --- | --- |
| Connections | Client and server connections by state. |
| Client waits | Accumulated client wait time and the collector-reported maximum wait time. |
| Throughput | Transactions and queries per second. |
| Average duration | Average transaction and query duration in milliseconds, calculated as total time divided by the corresponding number of completed operations within each chart interval. |
| Processing | Accumulated transaction and query time per second. |
| Capacity | Client and server connection capacity utilization. |
| Traffic | Received and sent network traffic. |

When a node runs multiple PgBouncer processes, their metrics remain separate. Database and pool labels identify the source of database-specific series.

## Tables

The **Tables** dashboard provides metrics for individual tables. Filter by database and schema, then choose the tables to display. By default, the dashboard selects up to 10 tables ranked by activity in the selected period.

| Charts or groups | What they show |
| --- | --- |
| Writes and HOT updates | Inserts, updates, deletes, HOT updates, and the HOT-update percentage. |
| Scans | Sequential and index scans, and rows fetched by each scan method. |
| Cache / I/O | Heap and index cache hit ratios, with reads from memory and disk shown separately. |
| TOAST | Cache hit ratios and memory/disk I/O for TOAST data and TOAST indexes. |
| Vacuum / Analyze | Time since manual and automatic VACUUM and ANALYZE operations. |
| Size / Bloat | Estimated live and dead rows, dead-row percentage, total relation size including indexes and TOAST, and estimated bloat in bytes and percent. |

Expand the chart groups to inspect additional metrics. Row counts and bloat are estimates; a missing bloat estimate is shown as unavailable rather than zero.

## Indexes

The **Indexes** dashboard uses the same node, database, schema, table, and period controls. Its default table selection is ranked by index scan activity. It provides index size and estimated bloat in bytes and percent.

The **Unused Indexes** table lists indexes marked unused in every available sample within the selected period. If any available sample marks an index as used, that index is excluded. The usage status reflects scans and row reads since index creation or the last statistics reset.

The unused-index list covers all monitored tables in the selected database and schema, independently of the table selection used for the charts. It includes the node, table, index, and last available index size for the selected period.

## Open the Netdata dashboard

Netdata provides a much larger set of metrics and dashboards, which you can explore directly on each node:

```text
http://NODE:19999
```

Replace `NODE` with the hostname or IP address of a database node reachable from your browser. Each agent provides the metrics collected on that node. Direct access requires connectivity to port `19999` and permission under the agent's access configuration. In cloud deployments, public access is disabled by default.

See [Netdata dashboards and charts](https://learn.netdata.cloud/docs/dashboards-and-charts) for more information about accessing the agent's dashboards.

## Netdata collection limits

Netdata's PostgreSQL collector defaults to **50 tables** and **250 indexes** per database. Exceeding either limit can cause Netdata to skip detailed table and index metrics for that database, leaving the **Tables** and **Indexes** dashboards without data. Database-level metrics remain available. You can adjust `max_db_tables` and `max_db_indexes` in the [collector configuration](https://learn.netdata.cloud/docs/collecting-metrics/collectors/databases/postgresql); set a limit to `0` to remove it.

:::info
We submitted [Netdata PR #24234](https://github.com/netdata/netdata/pull/24234) to select the most active tables and indexes within these limits instead of skipping collection. The proposal is under review and may be included in a future Netdata release.
:::
