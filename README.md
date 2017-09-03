# DQL Filter
------------

DQL Segment filter for OroPlatform.

DQL stands for Doctrine Query Language that provides powerful querying capabilities over your object model. 
Default query generator behavior of adding filters from segment relations with `( WHERE EXSIST (..))` sql sentence create very unperformant queries for database. So dql filter it’s the most flexible way to search for entities and is for everyone: developers sale managers and even non-technical business users.

### Installation

```bash
composer require okvpn/dql-filter
```

### Example

* Select entities with source "other" and gender is not null

```sql
WHERE rootEntity.source = 'other' AND rootEntity.gender IS NOT NULL
```

* Select all contacts that have the primary address with region AR-B or AR-F and gender is male

```sql
JOIN rootEntity.addresses a WITH a.primary = true AND a.region IN ('AR-B', 'AR-F')
WHERE rootEntity.gender = 'male'
```

### License

MIT License.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
