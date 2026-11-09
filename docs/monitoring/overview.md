---
sidebar_position: 1
sidebar_label: Overview
slug: /monitoring
---

# Monitoring

Autobase Platform provides cluster health checks and built-in dashboards to help you understand the state and performance of your PostgreSQL clusters.

**Autobase is not a monitoring system.** It integrates with the [Netdata Agent](#netdata-integration) to provide convenient access to selected metrics and charts directly in the platform.

:::tip
With Autobase, you have the freedom to monitor your way. Full server access lets you install any monitoring solution, including the tools your team already trusts.
:::

## Cluster health and performance

The platform provides two complementary views:

- [**Cluster health**](./cluster-health.md): a status based on the PostgreSQL cluster topology and member states reported by Patroni. It helps you identify missing or unhealthy database nodes.
- [**Dashboards**](./dashboards.md): historical metrics from Netdata, available on each cluster's **Monitoring** page. The dashboards cover the operating system, PostgreSQL, PgBouncer, tables, and indexes.

Cluster health checks do not depend on Netdata. A cluster can be healthy while its metrics are unavailable, or have working dashboards while a database node needs attention.

## Netdata integration

Autobase installs and configures a [Netdata Agent](https://github.com/netdata/netdata) on each database node by default. The agent collects system and PostgreSQL metrics, as well as PgBouncer metrics when the connection pooler are enabled.

Metrics and their history are stored by Netdata. Autobase does not maintain a separate time-series database. By default, each agent stores metrics on disk in three tiers:

| Resolution | Retention limit | Storage limit per tier |
| --- | --- | --- |
| Per second | 14 days | 1 GiB |
| Per minute | 3 months | 1 GiB |
| Per hour | 1 year | 1 GiB |

Allow approximately 4 GiB of disk space per node, including metadata. Actual history is limited by both retention time and storage capacity. To customize these limits, set `dbengine_tier_*_retention_time` and `dbengine_tier_*_retention_size` at the root of your cluster configuration, replacing `*` with `0`, `1`, or `2`. See [`netdata_conf`](https://github.com/autobase-tech/autobase/blob/7ba21c2bf317fd394370ad9592f95c534344e51a/automation/roles/common/defaults/main.yml#L992-L1007) in the `common` role defaults for the available settings.

Netdata installation is controlled by the following cluster configuration setting:

```yaml
netdata_install: true
```

The cluster creation form also exposes a **Netdata monitoring** option in its additional settings when Expert Mode is enabled. If Netdata installation is disabled, the platform dashboards cannot provide metrics for that cluster.
