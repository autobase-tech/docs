import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const cloneSeries = [
  { date: '04/16', total: 141 },
  { date: '04/17', total: 90 },
  { date: '04/18', total: 42 },
  { date: '04/19', total: 43 },
  { date: '04/20', total: 201 },
  { date: '04/21', total: 320 },
  { date: '04/22', total: 165 },
  { date: '04/23', total: 175 },
  { date: '04/24', total: 281 },
  { date: '04/25', total: 63 },
  { date: '04/26', total: 21 },
  { date: '04/27', total: 438 },
  { date: '04/28', total: 385 },
  { date: '04/29', total: 176 },
];

const chartWidth = 722;
const chartHeight = 416;
const chartPadding = {
  top: 28,
  right: 18,
  bottom: 46,
  left: 56,
};
const chartMaxY = 600;
const yTicks = [0, 200, 400, 600];
const xTickIndexes = [0, 2, 4, 6, 8, 10, 12];

const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;

function getChartX(index) {
  return chartPadding.left + (index / (cloneSeries.length - 1)) * plotWidth;
}

function getChartY(value) {
  return chartPadding.top + plotHeight - (value / chartMaxY) * plotHeight;
}

const linePoints = cloneSeries
  .map((point, index) => `${getChartX(index)},${getChartY(point.total)}`)
  .join(' ');

const areaPoints = [
  `${chartPadding.left},${chartPadding.top + plotHeight}`,
  ...cloneSeries.map((point, index) => `${getChartX(index)},${getChartY(point.total)}`),
  `${chartPadding.left + plotWidth},${chartPadding.top + plotHeight}`,
].join(' ');

const totalClones = cloneSeries.reduce((sum, point) => sum + point.total, 0);
const highlightedPointIndex = cloneSeries.findIndex((point) => point.date === '04/27');
const highlightedPoint = cloneSeries[highlightedPointIndex];
const highlightX = getChartX(highlightedPointIndex);
const highlightY = getChartY(highlightedPoint.total);
const tooltipWidth = 166;
const tooltipHeight = 86;
const tooltipX = Math.min(chartWidth - tooltipWidth - 16, highlightX - tooltipWidth + 34);
const tooltipY = Math.max(18, highlightY + 30);

const stats = [
  { icon: '/img/featured/icon-github-sm.svg', number: '2500+',  label: 'Github clones (last 14 days)' },
  { icon: '/img/featured/icon-star.svg',      number: '4k+',    label: 'GitHub stars' },
  { icon: '/img/featured/icon-ansible.svg',   number: '10K+',   label: 'Ansible Galaxy downloads' },
  { icon: '/img/featured/icon-docker.svg',    number: '100k+',  label: 'Docker downloads' },
];

const cards = [
  {
    icon: '/img/featured/icon-production.svg',
    title: 'Used in production since 2019',
    body: 'Built on real workloads, real experience – not assumptions',
  },
  {
    icon: '/img/featured/icon-github-lg.svg',
    title: 'The project is live. The community is growing.',
    body: (
      <>
        Join thousands of engineers building with{' '}
        <span className={styles.orange}>Autobase</span>.
      </>
    ),
  },
];

export default function FeaturedSection() {
  return (
    <section className={styles.section}>

      {/* ── Title block ── */}
      <div className={styles.titleBlock}>
        <p className={styles.titleLine}>
          <span className={styles.orange}>2,500+</span>
          {' '}clones in just 14 days
        </p>
        <p className={styles.subtitle}>
          Real developers. Real interest. Straight from{' '}
          <span className={styles.orange}>GitHub</span>
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className={clsx('row justify-content-center align-items-center', styles.statsRow)}>
        {stats.map((s) => (
          <div key={s.label} className="col-auto">
            <div className={styles.statItem}>
              <img src={s.icon} alt="" aria-hidden="true" width={36} height={36} loading="lazy" decoding="async" />
              <div className={styles.statText}>
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Git clone chart ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <p className={styles.chartEyebrow}>Git clones</p>
            <p className={styles.chartTitle}>Clones in last 14 days</p>
          </div>
          <p className={styles.chartTotal}>{totalClones.toLocaleString('en-US')} Clones</p>
        </div>

        <div className={styles.chartFrame}>
          <svg
            className={styles.chartSvg}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="Git clone trend over the last 14 days"
          >
            <defs>
              <linearGradient id="featuredAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34A853" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
              </linearGradient>
              <filter id="featuredTooltipShadow" x="-20%" y="-20%" width="140%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.12" />
              </filter>
            </defs>

            {yTicks.map((tick) => {
              const y = getChartY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={chartPadding.left}
                    y1={y}
                    x2={chartPadding.left + plotWidth}
                    y2={y}
                    className={styles.chartGridLine}
                  />
                  <text x={chartPadding.left - 14} y={y + 6} textAnchor="end" className={styles.chartAxisLabel}>
                    {tick}
                  </text>
                </g>
              );
            })}

            {xTickIndexes.map((index) => {
              const x = getChartX(index);
              return (
                <g key={cloneSeries[index].date}>
                  <line
                    x1={x}
                    y1={chartPadding.top}
                    x2={x}
                    y2={chartPadding.top + plotHeight}
                    className={styles.chartVerticalLine}
                  />
                  <text x={x} y={chartPadding.top + plotHeight + 28} textAnchor="middle" className={styles.chartAxisLabel}>
                    {cloneSeries[index].date}
                  </text>
                </g>
              );
            })}

            <polygon points={areaPoints} className={styles.chartArea} />
            <polyline points={linePoints} className={styles.chartLine} />

            <circle cx={highlightX} cy={highlightY} r="14" className={styles.chartHighlightGlow} />
            <circle cx={highlightX} cy={highlightY} r="9" className={styles.chartHighlightOuter} />
            <circle cx={highlightX} cy={highlightY} r="7" className={styles.chartHighlightInner} />

            <g transform={`translate(${tooltipX} ${tooltipY})`} filter="url(#featuredTooltipShadow)">
              <rect width={tooltipWidth} height={tooltipHeight} rx="16" className={styles.chartTooltipBox} />
              <text x="18" y="26" className={styles.chartTooltipDate}>{highlightedPoint.date}</text>
              <circle cx="24" cy="56" r="8" className={styles.chartTooltipDot} />
              <text x="40" y="62" className={styles.chartTooltipLabel}>Total</text>
              <text x={tooltipWidth - 18} y="62" textAnchor="end" className={styles.chartTooltipValue}>
                {highlightedPoint.total}
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* ── Featured in ── */}
      <div className={styles.featuredBlock}>
        <div className={styles.featuredTitle}>
          <span className={styles.featuredIn}>Featured in</span>
          <img
            src="/img/featured/logo-brightcoding.png"
            alt="BrightCoding"
            className={styles.featuredLogo}
            width={60}
            height={49}
          />
        </div>
        <div className={styles.featuredArticle}>
          <p className={styles.articleTitle}>
            Autobase: The Revolutionary PostgreSQL Cluster Automation Tool
          </p>
          <a
            href="https://www.blog.brightcoding.dev/2026/02/14/autobase-the-revolutionary-postgresql-cluster-automation-tool"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.articleLink}
          >
            Read article
          </a>
        </div>
      </div>

      {/* ── Bottom trust cards ── */}
      <div className={clsx('row', styles.cardsRow)}>
        {cards.map((card, i) => (
          <div key={i} className="col-12 col-md-6">
            <div className={styles.card}>
              <img src={card.icon} alt="" aria-hidden="true" width={46} height={46} className={styles.cardIcon} loading="lazy" decoding="async" />
              <div className={styles.cardText}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
