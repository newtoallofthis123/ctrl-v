import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { ThemeInput } from './Inputs'
import { exportComponentAsPNG } from "react-component-export-image";

const Bold = styled.span`
    font-weight: 700
`

const StyledDiv = styled.div`
    display: inline-block;
    margin: 2em 0;
`

const Button = styled.button`
    margin-right: 0 !important;
    margin-left: 2em !important;
    height: calc(16px + 1.6em);
    margin-top: 1.6em !important;
`

const SpacedText = styled.span`
    margin-right: 1em;
`

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
    transform: translateY(0.2em);
`

const PasteInfo = (props) => {
    const history = useHistory();
    const redirRaw = () => {
        const redirUrl = `/raw/${props.hash}`
        history.push(redirUrl);
    }

    const renderable = () => {
        const buttonTxt = props.isRenderMode ? 'text' : 'render'
        if (props.lang === 'latex' || props.lang === 'markdown') {
            return (
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={props.toggleRenderCallback}>
                    {buttonTxt}
                </Button>
            );
        }
    }

    return (
        <div>
            <Flex>
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={redirRaw}>
                    view raw
                </Button>
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={() => exportComponentAsPNG(props.compref, `paste-${props.hash}.png`)}>
                    save png
                </Button>
                {renderable()}
                <ThemeInput
                    value={props.theme}
                    onChange={props.onChange}
                    id="themeInput" />
            </Flex>
            <StyledDiv>
                <SpacedText>
                    <Bold>language:&nbsp;</Bold>{props.lang}
                </SpacedText>
                <SpacedText>
                    <Bold>expires:&nbsp;</Bold>{props.expiry}
                </SpacedText>
            </StyledDiv>
            <br />
            {props.err}
        </div>
    );
}

export default PasteInfo