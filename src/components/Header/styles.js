import styled from 'styled-components';

export const Area = styled.div`
    background-color: #fff;
    height: 60px;
    border-bottom: 1px solid #ccc;

    .container{
        display: flex;
        align-items: center;
    }

    .nav {
        margin-left: 2em;
        font-size: 2em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
    }

    .logo-buttons {
        flex: 1;
        display: flex;
        max-width: 960px;
        align-items: center;
        justify-content: space-between;
        margin: auto;
        padding: 0 20px;        

        a {
            text-decoration: none;
        }

        .logo {
            flex: 1;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            h3 {
                margin-left: 10px;
                font-size: 20px;
            }

            .logo-olx{
                width: 60px;
            }
        }

        nav {
            padding-top: 10px;
            padding-bottom: 10px;
            justify-content: flex-end;

            ul, li {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            ul {
                display: flex;
                align-items: center;
                height: 40px;
            }

            li {
                margin-left: 20px;
                margin-right: 20px;

                a, button{
                    border: 0;
                    background: none;
                    color: #000;
                    font-size: 14px;
                    text-decoration: none;
                    cursor: pointer;
                    outline: 0;

                    &:hover{
                        color: #999;
                    }                    
                }
            }
        }
        
    }

   `;