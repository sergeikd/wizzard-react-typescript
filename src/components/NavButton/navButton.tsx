import React, {MouseEvent} from "react";

interface INavButtonProps {
    pageId: number;
    maxPages: number;
    summary: number[];
    name: string;
    buttonClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const NavButton: (props: INavButtonProps) => JSX.Element = (props) => {
    const { pageId, maxPages, summary, buttonClickHandler, name } = props;
    const isDisabled: boolean = name === "Back"
        ? pageId <= 0
        : pageId >= maxPages || summary[pageId] === undefined;

    return (
        <button
            className={isDisabled ? "disabled" : "enabled clickable"}
            disabled={isDisabled}
            onClick={buttonClickHandler}>
            {name}
        </button>
    );
};