const tableConfig = {
    columns: [
        {
            name: 'service',
            key: 'service',
            type: 'text'
        },
        {
            name: 'destination',
            key: 'destination',
            type: 'text'
        },
        {
            name: 'source',
            key: 'source',
            type: 'text'
        },
        {
            name: 'date',
            key: 'calldate',
            type: 'date'
        },
        {
            name: 'hour',
            key: 'calldate',
            type: 'hour'
        },
        {
            name: 'duration',
            key: 'duration',
            type: 'text'
        },
        {
            name: 'disposition',
            key: 'disposition',
            type: 'text'
        },
        {
            name: 'note',
            key: 'note',
            type: 'text'
        },
        {
            name: 'typing',
            key: 'typing',
            type: 'text'
        },
        {
            name: 'poll',
            key: 'poll',
            type: 'text'
        },
        {
            name: 'hasrecord',
            key: 'hasrecord',
            type: 'check'
        }
    ]
}

export default tableConfig