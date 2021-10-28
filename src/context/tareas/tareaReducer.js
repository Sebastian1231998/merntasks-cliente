
import { FILTRAR_TAREA , 
         AGREGAR_TAREA, 
         ERROR_FORMULARIO_TAREA , 
         ELIMINAR_TAREA,
         ACTUALIZAR_ESTADO,
         SELECCIONAR_TAREA,
         ACTUALIZAR_TAREA
        } from "../../types";

// eslint-disable-next-line
export default (state , action) => {

   switch(action.type){
       
    case FILTRAR_TAREA:

    return{
        ...state,
        tareas: action.payload

    }
    case AGREGAR_TAREA: 

    return{

        ...state,
        tareas:[...state.tareas , action.payload],
        errorformulario:false

    }
    case ERROR_FORMULARIO_TAREA: 

    return{

        ...state,
        errorformulario:true
    }

    case ELIMINAR_TAREA: 
    return{

        ...state,
        tareas: state.tareas.filter( tarea => tarea._id !== action.payload)
    }

  
  case ACTUALIZAR_ESTADO: 
    return{

        ...state,
        tarea: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload  :  tarea)
    }

    case SELECCIONAR_TAREA: 
    return{

        ...state, 
        tareaseleccionada: action.payload

    }
    case ACTUALIZAR_TAREA: 
    return{

        ...state,
        tareas: state.tareas.map(tarea => tarea._id === action.payload._id ? action.payload  :  tarea),
        tareaseleccionada:null,
       
    }

    default: 
    return state; 

   }

}