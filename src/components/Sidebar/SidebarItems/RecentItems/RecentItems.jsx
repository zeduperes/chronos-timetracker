import React, { PropTypes } from 'react';
import moment from 'moment';

import Flex from '../../../Base/Flex/Flex';
import RecentItem from './RecentItem/RecentItem';
import RecentEmptyItem from './RecentEmptyItem/RecentEmptyItem';
import TimestampItem from './TimestampItem/TimestampItem';
import LinearGradientSpinner from '../../../Spinners/LinearGradientSpinner';

moment.locale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: 'L',
    sameElse: 'L',
  },
});

const RecentItems = ({
  items,
  onItemClick,
  fetching,
  current,
  tracking,
  selectRecent,
  recentSelected,
}) =>
  <div className="RecentItems">
    {items.toList().map((item, i) =>
      <Flex column key={i}>
        <TimestampItem date={item.toList().get(0).get('updated')} index={i} />
        <RecentItem
          onClick={id => {
            onItemClick(id);
            selectRecent(i);
          }}
          index={i}
          worklogs={item.groupBy(w => w.getIn(['issue', 'id']))}
          current={current}
          recentSelected={recentSelected}
          tracking={tracking}
        />
      </Flex>
    )}
    {items.size === 0 && !fetching && <RecentEmptyItem />}
  </div>;

RecentItems.propTypes = {
  items: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  current: PropTypes.string,
  tracking: PropTypes.string,
  selectRecent: PropTypes.func.isRequired,
  recentSelected: PropTypes.number,
};

export default RecentItems;