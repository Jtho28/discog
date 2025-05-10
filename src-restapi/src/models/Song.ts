import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';

import { isRelationalKey, transIsDate } from '@src/common/util/validators';
import { IModel } from './common/types';

/**********************************************************
                        Constant
**********************************************************/

const DEFAULT_SONG_VALS = (): ISong => ({
    id: -1,
    title: '',
    artist: '',
    favorite: false,
    created: new Date()
});

/**********************************************************
                        Types
**********************************************************/

export interface ISong extends IModel {
    title: string;
    artist: string;
    favorite: boolean;
}

/**********************************************************
                        Setup
**********************************************************/

const parseSong = parseObject