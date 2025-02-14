import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../../app/types';
import { IconPinParticipant } from '../../../base/icons/svg';
import { getParticipantById } from '../../../base/participants/functions';
import BaseIndicator from '../../../base/react/components/web/BaseIndicator';
// eslint-disable-next-line lines-around-comment
// @ts-ignore
import { getPinnedActiveParticipants, isStageFilmstripAvailable } from '../../functions.web';

/**
 * The type of the React {@code Component} props of {@link PinnedIndicator}.
 */
type Props = {

    /**
     * The font-size for the icon.
     */
    iconSize: number;

    /**
     * The participant id who we want to render the raised hand indicator
     * for.
     */
    participantId: string;

    /**
     * From which side of the indicator the tooltip should appear from.
     */
    tooltipPosition: string;
};

const useStyles = makeStyles(() => {
    return {
        pinnedIndicator: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
            padding: '2px',
            zIndex: 3,
            display: 'inline-block',
            borderRadius: '4px',
            boxSizing: 'border-box'
        }
    };
});

/**
 * Thumbnail badge showing that the participant would like to speak.
 *
 * @returns {ReactElement}
 */
const PinnedIndicator = ({
    iconSize,
    participantId,
    tooltipPosition
}: Props) => {
    const stageFilmstrip = useSelector(isStageFilmstripAvailable);
    const pinned = useSelector((state: IState) => getParticipantById(state, participantId))?.pinned;
    const activePinnedParticipants: Array<{ participantId: string; pinned: boolean; }>
        = useSelector(getPinnedActiveParticipants);
    const isPinned = activePinnedParticipants.find(p => p.participantId === participantId);
    const styles = useStyles();

    if ((stageFilmstrip && !isPinned) || (!stageFilmstrip && !pinned)) {
        return null;
    }

    return (
        <div className = { styles.pinnedIndicator }>
            <BaseIndicator
                icon = { IconPinParticipant }
                iconSize = { `${iconSize}px` }
                tooltipKey = 'pinnedParticipant'
                tooltipPosition = { tooltipPosition } />
        </div>
    );
};

export default PinnedIndicator;
