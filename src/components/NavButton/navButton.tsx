import React, {MouseEvent} from "react";

interface INavButtonProps {
    pageId: number;
    maxPages: number;
    summary: number[];
    name: string;
    onClickTo: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const NavButton: (props: INavButtonProps) => JSX.Element = (props) => {
    const { pageId, maxPages, summary, onClickTo, name } = props;
    const isDisabled: boolean = name === "Back"
        ? pageId <= 0
        : pageId >= maxPages || summary[pageId] === undefined;

    return (
        <button
            className={isDisabled ? "disabled" : "enabled clickable"}
            disabled={isDisabled}
            onClick={onClickTo}>
            {name}
        </button>
    );
};