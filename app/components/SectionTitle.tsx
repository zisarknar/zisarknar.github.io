import React from "react";

interface Props {
    title: string
}

const SectionTitle: React.FC<Props> = ({ title }) => {
    return <h1 className="capitalize font-bold text-2xl mb-8">{title}</h1>
}

export default SectionTitle;