import React from 'react';
import { render } from 'react-dom';
// import { withStyles } from '@material-ui/styles'; 
import SyntaxHighlighter from 'react-syntax-highlighter'; 
import { atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import PropTypes from 'prop-types'; 

// const styles = {
//     syntaxHighlighter: {
//         width: '70%',
//         float: 'right', 
//         maxHeight: '80vh', 
//         overflowY: 'scroll',
//     },
// }; 

// class ScrollableSyntaxHighlighter extends React.Component {
    // constructor(props) {
    //     super(props);

function ScrollableSyntaxHighlighter () {
        const code = `class Solution { 
    
            public int numSubmatrixSumTarget(int[][] matrix, int target) {
                int n = matrix.length;
                int m = matrix[0].length; 
                
                int[][] memo = new int[n + 1][m + 1]; 
                
                for(int y = 0; y < n; y++) {
                    for(int x = 0; x < m; x++) {
                        memo[y + 1][x + 1] = 
                            memo[y + 1][x] + memo[y][x + 1] + matrix[y][x] - memo[y][x]; 
                    }
                }
                
                Set<String> seen = new HashSet<>(); 
                
                int res = 0; 
                for(int i = 0; i < n; i++) {
                    for(int j = 0; j < m; j++) {
                        res += findRes(memo, seen, i, j, n, m, target); 
                    }
                }
                
                return res; 
            }
            
            
            private int findRes(int[][] memo, Set<String> seen, int y, int x, int n, int m, int target) {
                int res = 0; 
                for(int i = 0; i < n; i++) {
                    for(int j = 0; j < m; j++) {
                        int y1 = Math.min(y, i), y2 = Math.max(y, i);
                        int x1 = Math.min(x, j), x2 = Math.max(x, j); 
                        String key = "" + x1 + "," + y1 + "," + x2 + "," + y2; 
                        
                        if(seen.contains(key)) continue;
                        
                        seen.add(key);
                        
                        int OD = memo[y2 + 1][x2 + 1];
                        int OC = memo[y2 + 1][x1]; 
                        int OB = memo[y1][x2 + 1];
                        int OA = memo[y1][x1];
                        
                        int curr = OD - OC - OB + OA; 
                        if(curr == target) {
                            ++res;
                        }
                    }
                }
                
                return res; 
            }
          
        }`;
    //     this.state = {
    //         code: initialCodeString,
    //         showLineNumbers: false
    //     };
    // }

    // render() {
        // const { classes } = this.props; 

        return (
            <div className="demo__root demo__root--virtualized">
                <header>

                </header>

                <main> 
                    <article className="example__container">
                        <div className="syntaxHighlighter" 
                             style = {{ width: '70%', float: 'right', maxHeight: '80vh', overflowY: 'scroll' }}> 
                            <SyntaxHighlighter
                                language="javascript"
                                style={atelierCaveLight}
                                showLineNumbers={true}
                                showInlineLineNumbers={true}
                            >
                                {code}

                            </SyntaxHighlighter>
                        </div> 
                    </article>
                </main>
            </div> 
        );
    // }
}


render(<ScrollableSyntaxHighlighter />, document.getElementById('root')); 
export default ScrollableSyntaxHighlighter