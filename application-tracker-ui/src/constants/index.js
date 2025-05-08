export const AppStatus = {
    IN_PROGRESS: 'IN_PROGRESS',
    SUBMITTED: 'SUBMITTED',
    REJECTED: 'REJECTED',
    INTERVIEW: 'INTERVIEW',
    OFFER: 'OFFER',
};

export const AppPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    EXPEDITED: 'EXPEDITED',
};

export const HeaderValues = {
    EMAIL: 'x-app-tracker-user-email',
    TOKEN: 'x-app-tracker-token'
}

export const ChartTypes = {
    BAR: 'bar',
    PIE: 'pie',
    LINE: 'line'
}

export const TEXTFIELD_STYLES = {
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: 'intermediate' 
        },
    }
}

export const TEXTFIELD_SELECT_SLOT_PROPS = {
    select: {
        MenuProps: {
            sx: {
                '& .MuiPaper-root': {
                    backgroundColor: 'white'
                }
            }
        }
    }
}

export const DEFAULT_SEARCH_REQUEST = {
    status: null,
    priority: null,
    keywords: null,
    employer: null,
    dateCreatedStart: null,
    dateCreatedEnd: null,
    dateAppliedStart: null,
    dateAppliedEnd: null,
    salaryMin: null,
    salaryMax: null
}