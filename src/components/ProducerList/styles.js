import styled from 'styled-components';

export const Area = styled.div`

    .title--box {
        display: flex;
        height: 50px;
        background-color: #ccc;
        padding: 0 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        justify-content: space-between;
        align-items: center;

        h3 {
            font-size: 22px;
            font-variant: small-caps;
        }

        .title--search {
            align-items: center;

            input {
                height: 25px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 14px;
                color: #000;
                padding: 0 5px;
                background-color: #eee;
            }

            button {
                height: 25px;
                border-radius: 5px;
                margin-left: 5px;
                background-color: #0096c7;
                color: #fff;
                border: 0;
                cursor: pointer;
            }
        }
    }

    .link--table {
        text-decoration: none;
    }

    .link--button {
        text-decoration: none;
        border-bottom-left-radius: 5px;

        &:hover {
            background-color: rgb(0,0,0,0.3);
        }
    }
`;