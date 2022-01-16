/* eslint-disable react/jsx-props-no-spreading */
import React, { FormEvent, useState } from 'react';

import { ResponsivePie, DefaultRawDatum } from '@nivo/pie';

interface RawDatum extends DefaultRawDatum {
  label?: string;
  color?: string;
}

interface Props {
  data: RawDatum[];
}

function ParticipationChart({ data }: Props): JSX.Element {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      innerRadius={0.5}
      padAngle={2.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      enableArcLinkLabels={false}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 15,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
}

export default ParticipationChart;
