import { memo } from 'react';
import AccountItem from '~/components/AccountItem/AccountItem';
function SearchResults({ data }) {
    return data.map((result) => <AccountItem key={result.id} data={result} />);
}

export default memo(SearchResults);
