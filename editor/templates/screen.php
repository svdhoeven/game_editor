<table class="screen">

    <script id="tpl_screen" type="text/template">

        <%
        var i = 0;
        for(var y = 0; y < 15; y++){
            %>
            <tr>
                <%
                for(var x = 0; x < 20; x++){
                    combo = combos[i];
                    %>
                    <td data-id="<%= combo.get('id') %>" data-x="<%= combo.get('x') %>" data-y="<%= combo.get('y') %>">

                        <img src="../public/img/sprites/<%= combo.get('source') %>.png"/>

                    </td>
                    <%
                    i++;
                }
                %>
            </tr>
            <%
        }
        %>

    </script>

</table>