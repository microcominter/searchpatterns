// import React from 'react';
// import { Search, Tv, ArrowLeft, Bell } from 'react-icons/hi';
// import '../../assets/css/adposting.css';

// export default function SearchPatterns() {
//   const questionCards = [
//     { title: 'Which', keywords: ['Which Milk Teeth Fall Out', 'Which Milk Teeth Come Out First', 'Which Milk Teeth Are Replaced', 'Which Milk Teeth Will Fall First', 'Which Milk Teeth Come Out', 'Which Milk Teeth Fall Down First', 'Which Milk Teeth Break'] },
//     { title: 'Where', keywords: ['Which Milk Teeth Fall Out', 'Which Milk Teeth Come Out First', 'Which Milk Teeth Are Replaced', 'Which Milk Teeth Will Fall First', 'Which Milk Teeth Come Out', 'Which Milk Teeth Fall Down First', 'Which Milk Teeth Break'] },
//     { title: 'When', keywords: [] },
//     { title: 'What', keywords: [] },
//   ];

//   return (
//     <div className="search-patterns">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon"></div>
//             <h1>SEARCH <span className="highlight">PATTERNS</span></h1>
//           </div>
//           <button className="icon-button"><ArrowLeft /></button>
//         </div>
//         <nav className="sidebar-nav">
//           <a href="#" className="active">Home</a>
//           <a href="#">Discover</a>
//           <a href="#">Archive</a>
//           <a href="#">Billing & Subscription</a>
//           <a href="#">FAQs</a>
//         </nav>
//         <button className="upgrade-button">Upgrade to Pro</button>
//         <div className="recent-searches">
//           <h6>PREVIOUS 30 DAYS</h6>
//           <div className="recent-list">
//             <a href="#">Which Milk Teeth Come Ou...</a>
//             <a href="#">Which Milk Teeth Are Repla...</a>
//             <a href="#">Which Milk Teeth Will Fall Fi...</a>
//             <a href="#">Which Milk Teeth Come Ou...</a>
//             <a href="#">Does Milk Teeth Have Roo...</a>
//             <a href="#">What Is A Milk Tooth</a>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <header className="main-header">
//           <div className="search-container">
//             <input type="text" placeholder="Search Patterns" className="search-input" />
//             <button className="create-campaign-button">
//               <Tv />
//               Create Campaign
//             </button>
//           </div>
//           <div className="user-actions">
//             <button className="icon-button"><Bell /></button>
//             <div className="user-avatar"></div>
//           </div>
//         </header>

//         <nav className="content-nav">
//           <a href="#" className="active">Questions</a>
//           <a href="#">Prepositions</a>
//           <a href="#">Comparison</a>
//         </nav>

//         <div className="content-area">
//           <div className="view-options">
//             <button className="view-button">
//               <Search />
//               Table View
//             </button>
//             <button className="view-button">Chart View</button>
//           </div>

//           <div className="question-cards">
//             {questionCards.map((card, index) => (
//               <div key={index} className="question-card">
//                 <h2>{card.title}</h2>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>KEYWORDS</th>
//                       <th>SEARCH VOL.</th>
//                       <th>CPC</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {card.keywords.map((keyword, idx) => (
//                       <tr key={idx}>
//                         <td>{keyword}</td>
//                         <td>
//                           <span className={`badge ${idx < 4 ? 'success' : 'danger'}`}>
//                             {idx < 4 ? '1.3k' : idx === 4 ? '200' : '100'}
//                           </span>
//                         </td>
//                         <td>
//                           <span className={`badge ${idx < 4 ? 'success' : 'danger'}`}>
//                             {idx < 4 ? '$ 0.1' : '-'}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>
//         </div>

//         <footer className="main-footer">
//           <div className="footer-search">
//             <Search className="search-icon" />
//             <input type="text" placeholder="Milk Teeth" />
//             <button className="search-button"><Search /></button>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }