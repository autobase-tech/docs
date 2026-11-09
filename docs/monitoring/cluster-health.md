---
sidebar_position: 2
---

import ThemedImage from '@theme/ThemedImage';

# Cluster health

The **Status** column on the **Clusters** page gives an overview of each PostgreSQL cluster's state. Autobase periodically queries the Patroni API and compares the reported cluster members with the expected number of PostgreSQL nodes.

Example of a three-node cluster with the `healthy` status:

<ThemedImage
  alt="Clusters page showing a three-node PostgreSQL cluster with healthy status"
  sources={{
    light: '/img/сluster.png',
    dark: '/img/сluster.dark.png',
  }}
/>

## Health statuses

| Status | Meaning |
| --- | --- |
| `healthy` | Patroni reports at least the expected number of PostgreSQL members, and at least that many members are in the `running` or `streaming` state. |
| `unhealthy` | Patroni reports the expected number of members or more, but fewer than the expected number are `running` or `streaming`. For example, a member may be present but stopped or still starting. |
| `degraded` | Patroni reports fewer PostgreSQL members than expected. One or more database nodes are missing from the reported topology. |
| `unavailable` | The platform previously connected to Patroni but can no longer retrieve cluster information from any known node's Patroni API. This can indicate an unreachable cluster or a connectivity problem between the platform and its nodes. |
| `maintenance` | The interface temporarily displays this status while it tracks an active management operation for the cluster, such as applying configuration changes, scaling, or upgrading. Check **Operations** for progress and logs. |

A health status summarizes Patroni membership and member states. It does not evaluate application response times, CPU or disk utilization, replication lag thresholds, or every aspect of database availability. Use the [dashboards](./dashboards.md) to investigate performance and resource usage.

:::note Maintenance and Patroni pause
The `maintenance` status is an operation indicator in the current UI session. It does not mean that Patroni automatic failover has been paused. Patroni maintenance mode is a separate setting; see [System Commands](../management/system-commands.md).
:::

## Deployment statuses

During initial deployment, you may also see:

| Status | Meaning |
| --- | --- |
| `deploying` | Cluster deployment is in progress. |
| `ready` | The deployment operation completed successfully. Subsequent Patroni health checks determine the cluster's health status. |
| `failed` | The deployment failed. Open **Operations** to inspect the operation and its logs. |

## Investigate a status change

Open the cluster's **Overview** page to review individual node roles, states, replication lag, and pending restart indicators. If a management operation is running or has failed, review **Operations**. Use **Monitoring** to correlate the change with system load, PostgreSQL activity, or replication behavior.

If the status is `unavailable`, check connectivity from the platform to the database nodes and the availability of their Patroni APIs.
