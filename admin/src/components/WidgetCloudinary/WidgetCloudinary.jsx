// import React from 'react'

// export default function WidgetCloudinary() {
//   return (
//     <div>WidgetCloudinary</div>
//   )
// }


import React from 'react';
class WidgetCloudinary extends React.Component {
  constructor(props){
     super(props);
     this.state = {}
   }
  showWidget = () => {
    
    let widget = window.cloudinary.createUploadWidget({ 
       cloudName: "mercadito",
       uploadPreset:"htjxn8dc"}, 
    (error, result) => {
      if (!error && result && result.event === "success") { 
      this.props.setUrl(result.info.url);
    }});
    widget.open()
  }
  render() {
    return (<div>
           <button onClick={this.showWidget}> Upload Image </button>
           </div>
    );
  }
}
export default WidgetCloudinary;
