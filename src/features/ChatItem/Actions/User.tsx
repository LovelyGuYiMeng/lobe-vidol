import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { memo } from 'react';

import type { RenderAction } from '@/features/ChatItem/type';

const UserActionsBar: RenderAction = ({ onActionClick }) => {
  const { copy, divider, del, edit, regenerate } = useChatListActionsBar({
    copy: '复制',
    delete: '删除',
    edit: '编辑',
    regenerate: '重新生成',
  });
  return (
    <ActionIconGroup
      dropdownMenu={[copy, divider, del]}
      items={[regenerate, edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(UserActionsBar);
