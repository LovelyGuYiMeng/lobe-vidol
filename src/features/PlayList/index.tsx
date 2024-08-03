/* eslint-disable @next/next/no-img-element */
import { GradientButton } from '@lobehub/ui';
import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import AudioPlayer from '@/features/AudioPlayer';
import { useDanceStore } from '@/store/dance';
import { useGlobalStore } from '@/store/global';

import PlayItem from './Item';

interface PlayListProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    height: 100%;
    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
  list: css`
    overflow-y: scroll;
    width: 100%;
    padding: 0 ${token.padding}px;
  `,
  player: css`
    width: 100%;
    height: 64px;
    padding: 0 ${token.paddingSM}px;
    border-top: 1px solid ${token.colorBorder};
  `,
}));

const PlayList = (props: PlayListProps) => {
  const playlist = useDanceStore((s) => s.playlist);
  const { t } = useTranslation(['panel', 'features']);
  const { className, style } = props;
  const { styles } = useStyles();

  const [openPanel] = useGlobalStore((s) => [s.openPanel]);

  const marketButton = useMemo(
    () => (
      <GradientButton
        onClick={() => {
          openPanel('dance');
        }}
        size={'middle'}
        glow
      >
        + {t('dance.musicAndDance')}
      </GradientButton>
    ),
    [],
  );

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Flexbox className={styles.list} flex={1}>
        <Header title={t('info.playlist', { ns: 'features' })} extra={marketButton} />

        {playlist.map((id) => {
          return <PlayItem playItemId={id} key={id} />;
        })}
        {playlist.length === 0 ? (
          <Empty description={t('dance.noPlayList')} image={Empty.PRESENTED_IMAGE_SIMPLE}>
            {marketButton}
          </Empty>
        ) : null}
      </Flexbox>
      <Center className={styles.player}>
        <AudioPlayer />
      </Center>
    </Flexbox>
  );
};

export default memo(PlayList);
