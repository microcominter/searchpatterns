    import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
    import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contextApi/SearchContext.jsx';
import { setPrompt } from '../../slices/query.js';
import { motion, AnimatePresence } from 'framer-motion';
    
    const Table = ({ data, activeTab, onTableClick }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const { loading } = useContext(SearchContext);
        const [chartsLoaded, setChartsLoaded] = useState(false);
        const [selected, setSelected] = useState("IN");
        const [tableData, setTableData] = useState([]);

        const chrt = useRef(null);
        const chrtcompare = useRef(null);
        const chartprepos = useRef(null);
        const suggestions = useSelector((state) => state.searchdata.suggestions);
        const prepositions = useSelector((state) => state.searchdata.prepositions);
        const comparisons = useSelector((state) => state.searchdata.comparisons);
      
        const showQuestionTable = useSelector((state) => state.showvariables.showQuestionsTable);
        const showPrepositionsTable = useSelector((state) => state.showvariables.showPrepositionsTable);
        const showComparisonTable = useSelector((state) => state.showvariables.showComparisonTable);
      
        const navigate = useNavigate();
        const dispatch = useDispatch();
      
        const handleTableClick = (query) => {
          onTableClick(query);
        };
      
        const getTableData = useMemo(() => {
            switch (activeTab) {
                case 'questions':
                    return suggestions;
                case 'prepositions':
                    return prepositions;
                case 'comparisons':
                    return comparisons;
                default:
                    return suggestions;
            }
        }, [activeTab, suggestions, prepositions, comparisons]);

        useEffect(() => {
            setTableData(getTableData);
        }, [getTableData]);

        const filteredData = Object.entries(tableData || []).filter(([key, values]) =>
            key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            values.some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        const container = {
            hidden: { opacity: 1, scale: 0 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.2
                }
            }
        };

        const item = {
            hidden: { y: 20, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1
            }
        };

        useEffect(() => {
          if (loading) {
            setTimeout(() => {
              setChartsLoaded(true);
            }, 2000);
          }
        }, [loading]);

        return (
            <motion.div 
                className="question-cards"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {filteredData.map(([key, values]) => (
                        <motion.div 
                            key={key} 
                            variants={item} 
                            className="question-card"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            layout
                        >
                            <h2>{key.toUpperCase()}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>KEYWORDS</th>
                                        <th>SEARCH VOL.</th>
                                        <th>CPC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {values.map((keyword, idx) => (
                                        <motion.tr 
                                            key={idx} 
                                            onClick={() => handleTableClick(keyword)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <td>{keyword}</td>
                                            <td>
                                                <span className={`badge ${idx < 4 ? 'success' : 'danger'}`}>
                                                    {idx < 4 ? '1.3k' : idx === 4 ? '200' : '100'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${idx < 4 ? 'success' : 'danger'}`}>
                                                    {idx < 4 ? '$ 0.1' : '-'}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        );
    };

    export default Table;
