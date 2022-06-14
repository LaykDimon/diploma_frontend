import React, { useState } from 'react';
import { getUserSessionData } from '../extra/utils';
import '../style.css';
import TotalIndicator from './WordsIndicator';
//import AnalyzeButton from './AnalyzeButton';

export default function AnalyzeField() {
    
    const [inputText, setInputText] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const [showResults, setShowResults] = useState(false);
    // const [showRecommendations, setShowRecommendations] = useState(false) 
    
    const handleTextChange = (e) => setInputText(e.target.value);
    const handleUrlChange = (e) => setInputUrl(e.target.value);
    
    const [analyzedText, setAnalyzedText] = useState('');

    // const Words = () => (
    //     <>
    //     for(var key in analyzedText['words']) {
    //         <tr>
    //             <td>{key}</td>
    //             <td>{analyzedText['words'][key]}</td>
    //         </tr>
    //     }
        
    //     </>
    // )

//     const mappedObject = Object.entries(analyzedText['words']).map(([k,v]) => 
//     <tr>
//         <td>{k}</td>
//         <td>{v}</td>
//     </tr>
// );
    const listItems = () => Object.keys(analyzedText['words']).map((key) => 
            <tr>
                <td>{analyzedText['words'][key][0]}</td>
                <td>{analyzedText['words'][key][1]}</td>
                <td>{(analyzedText['words'][key][1] / analyzedText['lemmatized_word_count'] * 100).toFixed(2)}%</td>
            </tr>        
        );
        // for(var key in analyzedText['words']) {
        //    console.log(key);
        //    console.log(analyzedText['words'][key]);
        //    return (
        //         <tr>
        //             <td>{key}</td>
        //             <td>{analyzedText['words'][key]}</td>
        //         </tr>
        //    ); 
               
    

    const Words = () => (
        <table className='styledTable'>
            
            <caption>Словник слів</caption>
            <thead>
                <tr>
                    <th>Слово</th>
                    <th>Кількість повторень</th>
                    <th>Відсоток</th>
                </tr>
            </thead>
            
            <tbody>
                {listItems()}
            </tbody>

        </table>
    );
        
        
        

    
    const Results = () => (
        <>
            <table className='styledTable'>
                <caption>Результати аналізу</caption>
                <thead>
                    <tr>
                        <th>Параметр</th>
                        <th>Значення</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Кількість символів</td>
                        <td>{analyzedText["symbol_count"]}</td>
                    </tr>
                    <tr>
                        <td>Кількість символів без пунктуаційних знаків</td>
                        <td>{analyzedText["symbol_count_without_punct"]}</td>
                    </tr>
                    <tr>
                        <td>Кількість слів</td>
                        <td>{analyzedText["word_count"]}</td>
                    </tr>
                    <tr>
                        <td className='tooltip'>Кількість лематизованих слів
                            <span className='tooltipText'>Слова, словоформа яких приведена до основної словникової форми (леми).</span>
                        </td>
                        <td>{analyzedText["lemmatized_word_count"]}</td>
                    </tr>
                    <tr>
                        <td>Кількість речень</td>
                        <td>{analyzedText["sentence_count"]}</td>
                    </tr>
                    <tr>
                        <td className = 'tooltip'>Водність тексту
                            <span className='tooltipText'>Відношення стоп-слів до всіх слів в тексті</span>
                        </td>
                        <td>{analyzedText["water_content"]}%</td>
                    </tr>
                    <tr>
                        <td className = 'tooltip'>Класична нудота
                            <span className='tooltipText'>Квадратний корінь із числа повторень найчастішого слова</span>
                        </td>
                        <td>{analyzedText["classic_nausea"]}</td>
                    </tr>
                    <tr>
                        <td className = 'tooltip'>Академічна нудота
                            <span className='tooltipText'>Відношення кількості повторень найчастішого ключового слова до всіх слів в тексті</span>
                        </td>
                        <td>{analyzedText["academic_nausea"]}</td>
                    </tr>
                </tbody>
            </table>
            
            {Words()}
        </>            
      )

    function analyze() {
        fetch('http://127.0.0.1:8000/api/analyzer/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            input_text: inputText,
            user_id: getUserSessionData().user.id
        }),
        mode: 'cors',
      }).then(response => response.json())
      .then(data => {
          setAnalyzedText(data.text_stats);
          console.log(analyzedText['words']);  
          setShowResults(true);
      });
    }

    function parse() {
        fetch('http://127.0.0.1:8000/api/analyzer/parse/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            url: inputUrl
        }),
        mode: 'cors',
      }).then(response => response.json())
      .then(data => setInputText(data.content));
    }

    // function showTextRecommendations() {
    //     fetch('http://127.0.0.1:8000/api/analyzer/parse/', {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ 
    //         symbol_count: analyzedText["symbol_count"],
    //         symbol_count_without_punct: analyzedText["symbol_count_without_punct"],
    //         word_count: analyzedText["word_count"],
    //         sentence_count: analyzedText["sentence_count"],
    //         water_content: analyzedText["water_content"],
    //         classic_nausea: analyzedText["classic_nausea"],
    //         academic_nausea: analyzedText["academic_nausea"],
    //     }),
    //     mode: 'cors',
    //   }).then(response => response.json())
    //   .then(data => {  
    //     setShowRecommendations(true);          
    //   }); 
    // }
    
    
    return (
        <div>
            <div className='title'>Семантичний аналіз тексту</div>
            <textarea type="url" className='inputUrl' value={inputUrl} onChange={handleUrlChange}></textarea>
            <button className="analyzeBtn" onClick={parse}>Вивести текст</button>
            <textarea className="inputText" value={inputText} onChange={handleTextChange}></textarea>
            <br />
            {/* <TotalIndicator /> */}
            <button className="analyzeBtn" onClick={analyze}>Аналізувати</button>
            {/* <button className="analyzeBtn" onClick={showTextRecommendations}>Вивести рекомендації</button> */}
            { showResults ? <Results /> : null }
            {/* { showRecommendations ? <Recommendations /> : null } */}
        </div>
    );

    
}