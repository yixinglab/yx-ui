import YxDashboard from './components/dashboard/dashboard.vue';
import YxMoneyFlowCharts from './components/dashboard/dashboard2.vue';
import YxDualcurve from './components/dualcurve/dualcurve.vue';
import YxBarTwoDirection from './components/barCharts/barTwoDirection.vue';
import YxBubbleAnimateCharts from './components/bubbleCharts/bubbleAnimateCharts.vue';
import YxTags from './components/yx-ui/components/group/tags.vue';


const components = [
    YxDashboard,
    YxMoneyFlowCharts,
    YxDualcurve,
    YxBarTwoDirection,
    YxBubbleAnimateCharts, 
    YxTags
] 
const install = function(Vue) {
    if (install.installed) return;
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  };
  
  /* istanbul ignore if */
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  
module.exports = {
  components,
    install
  };
