import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as suggestService from '~/services/suggestService';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const [suggested, setSuggested] = useState([]);
    const [seeAll, setSeeAll] = useState(false);

    useEffect(() => {
        let fetchApi;
        if (seeAll) {
            fetchApi = async () => {
                const result = await suggestService.suggest(1, 16);
                setSuggested(result);
            };
        } else {
            fetchApi = async () => {
                const result = await suggestService.suggest(1, 5);
                setSuggested(result);
            };
        }

        fetchApi();
    }, [seeAll]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {suggested.map((suggest) => (
                <AccountItem key={suggest.id} data={suggest} />
            ))}
            {seeAll ? (
                <p onClick={() => setSeeAll(false)} className={cx('all-btn')}>
                    See less
                </p>
            ) : (
                <p onClick={() => setSeeAll(true)} className={cx('all-btn')}>
                    See all
                </p>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
