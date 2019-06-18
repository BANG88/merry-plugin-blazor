using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using {{ns}}BaseComponent;
using Microsoft.AspNetCore.Components;

namespace {{fullNamespace}}
{
    /// <summary>
    /// Base Component for {{properCase prefix}}{{properCase name}}
    /// </summary>
    public class {{componentName}} : AntBaseComponent
    {
        private string prefixCls = getPrefixCls("{{lowercase name}}");
        protected override Task OnParametersSetAsync()
        {
            ClassNames.Clear()
               .Add(prefixCls);

            return base.OnParametersSetAsync();
        }
    }
}
