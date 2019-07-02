using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace {{ns}}
{
    /// <summary>
    /// Base Component for {{properCase prefix}}{{properCase name}}
    /// </summary>
    public class {{componentName}} : AntBaseComponent
    {
        protected string prefixCls = getPrefixCls("{{lowercase name}}");
        protected override Task OnParametersSetAsync()
        {
            ClassNames.Clear()
               .Add(prefixCls);

            return base.OnParametersSetAsync();
        }
    }
}
