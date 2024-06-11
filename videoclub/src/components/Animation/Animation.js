import React from "react";
import { motion } from "framer-motion";

function Animation ({children}){

    const transition = { duration: 1.5, ease: "easeInOut" };
    const animationBasVersHaut = {
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0, transition },
      exit: { opacity: 0, y: 25, transition},
    };

    return (
        <motion.div
          key="liste-film"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationBasVersHaut}
        >
          {/* <div className='collection-tuiles'>    
            {tuilesFilm}
          </div>  */}
          {children}
        </motion.div>
    )
}

export default Animation;