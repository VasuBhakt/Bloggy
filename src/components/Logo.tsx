import React from 'react'

function Logo({ width }: { width: string }) {
    return (
        <div className={`w-${width}`}>Logo</div>
    )
}

export default Logo