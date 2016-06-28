module ReactHelper
  def client(component, id, props, path)
    sc = script(component, id, props, path)
    "<div id='#{id}'></div>#{sc}".html_safe
  end

  def isomorphic(component, id, props, path)
    sc = script(component, id, props, path)
    "<div id='#{id}'></div>#{sc}".html_safe
    resp = HTTParty.post 'http://localhost:3001', body: {}.to_json,
                                                  headers: { 'Content-Type' => 'application/json' }
    "<div id='#{id}'>#{resp.force_encoding('utf-8')}</div>#{sc}".html_safe
  end

  private

  def script(component, id, props, path)
    "<script>
      document.addEventListener('DOMContentLoaded', function(ev) {
        renderReact('#{id}', '#{component}', #{props.to_json}, '#{path}');
      })
    </script>"
  end
end
